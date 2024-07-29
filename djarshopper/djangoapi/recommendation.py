import pandas as pd
import numpy as np
import re
from sklearn.preprocessing import StandardScaler
from scipy.spatial import distance

def get_recommendations_with_healthiness(df, product_features, conditions=None, category=None):
    expected_keys = ['TotalFat', 'SatFat', 'TransFat', 'Sodium', 'TCarbs', 'Tsugar', 'DietFbr']
    for key in expected_keys:
        if key not in product_features:
            product_features[key] = 0.0
    
    def parse_nutritional_facts(nutritional_facts_str):
        facts = re.findall(r'(\w+)\(([\d.]+)\w?\)', nutritional_facts_str)
        return {fact[0]: float(fact[1]) for fact in facts}

    df['NutritionalFacts'] = df['NutritionalFacts'].fillna('').astype(str)
    nutritional_facts_df = df['NutritionalFacts'].apply(parse_nutritional_facts).apply(pd.Series)
    df_combined = pd.concat([df[['Categories', 'ProductName', 'Price', 'NutritionalFacts']], nutritional_facts_df], axis=1)
    numeric_features = nutritional_facts_df.columns.tolist()
    unnecessary_columns = ['Iron', 'Calorie', 'Carbohydrate', 'VitA', 'Iodine', 'VitC', 'Protein', 'Calcium']
    numeric_features = [col for col in numeric_features if col not in unnecessary_columns]
    original_values = df_combined[numeric_features].copy()
    scaler = StandardScaler()
    df_combined[numeric_features] = scaler.fit_transform(df_combined[numeric_features].fillna(0))
    product_df = pd.DataFrame([product_features])
    for col in numeric_features:
        if col not in product_df.columns:
            product_df[col] = 0.0
    product_features_scaled = scaler.transform(product_df[numeric_features].fillna(0))
    print("Scaled Product Features:", product_features_scaled)

    distances = df_combined[numeric_features].apply(lambda row: distance.euclidean(row, product_features_scaled[0]), axis=1)
    df_combined['Distance'] = distances
    recommended_products = df_combined.sort_values(by='Distance').copy()
    print("Recommended Products after Distance Calculation:", recommended_products.head())

    # Filter by category, case insensitive
    if category:
        category = category.strip().lower()
        recommended_products['Categories'] = recommended_products['Categories'].str.strip().str.lower()
        recommended_products = recommended_products[recommended_products['Categories'] == category]
        print("Filtered Recommended Products based on Category:", recommended_products.head())

    # If no products match the category, expand the search to include all products in the category
    if recommended_products.empty:
        recommended_products = df_combined[df_combined['Categories'] == category]
        print("Expanded search to include all products in the category:", recommended_products.head())

    # Condition-based filtering and sorting
    if conditions:
        for condition in conditions:
            if condition == 'diabetes' and 'Tsugar' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'Tsugar']]
                recommended_products = recommended_products.sort_values(by='Tsugar')
            elif condition == 'gastrointestinal' and 'DietFbr' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'DietFbr']]
                recommended_products = recommended_products.sort_values(by='DietFbr', ascending=False)
            elif condition == 'hypertension' and all(col in recommended_products.columns for col in ['TransFat', 'Sodium']):
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'TransFat', 'Sodium']]
                recommended_products = recommended_products.sort_values(by='Sodium')
            elif condition == 'uti' and all(col in recommended_products.columns for col in ['Tsugar', 'DietFbr']):
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'Tsugar', 'DietFbr']]
                recommended_products = recommended_products.sort_values(by=['Tsugar', 'DietFbr'])
            elif condition == 'skin diseases' and 'TotalFat' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'TotalFat']]
                recommended_products = recommended_products.sort_values(by='TotalFat', ascending=False)
            elif condition == 'liver diseases' and all(col in recommended_products.columns for col in ['Tsugar', 'Sodium']):
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'Tsugar', 'Sodium']]
                recommended_products = recommended_products.sort_values(by=['Tsugar', 'Sodium'])
            elif condition == 'kidney diseases' and 'Sodium' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'Sodium']]
                recommended_products = recommended_products.sort_values(by='Sodium')

    # Provide fallback recommendations if strict criteria are not met
    recommended_products = recommended_products.head(3)
    for col in numeric_features:
        recommended_products[col] = original_values.loc[recommended_products.index, col]
    print("Final Recommended Products:", recommended_products)

    return recommended_products[['Categories', 'ProductName', 'Price', 'NutritionalFacts']]
