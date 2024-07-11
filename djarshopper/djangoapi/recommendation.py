import pandas as pd
import numpy as np
import re
from sklearn.preprocessing import StandardScaler
from scipy.spatial import distance

# Define your algorithm
def get_recommendations_with_healthiness(df, product_features, conditions=None, category=None):
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
    distances = df_combined[numeric_features].apply(lambda row: distance.euclidean(row, product_features_scaled[0]), axis=1)
    df_combined['Distance'] = distances
    recommended_products = df_combined.sort_values(by='Distance').copy()

    if conditions:
        for condition in conditions:
            if condition == 'diabetes' and 'Tsugar' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'Tsugar']]
                recommended_products = recommended_products.sort_values(by='Tsugar')
            elif condition == 'gastrointestinal' and 'DietFbr' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'DietFbr']]
                recommended_products = recommended_products.sort_values(by='DietFbr', ascending=False)
            elif condition == 'hypertension' and 'Sodium' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'Sodium']]
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

    if category:
        recommended_products = recommended_products[recommended_products['Categories'] == category]

    if not conditions:
        similar_products = recommended_products.copy()
        similar_products = similar_products[similar_products['Categories'] == category].head(3)
        for col in numeric_features:
            similar_products[col] = original_values.loc[similar_products.index, col]
        return similar_products[['Categories', 'ProductName', 'Price', 'NutritionalFacts']]

    recommended_products = recommended_products.head(3)
    for col in numeric_features:
        recommended_products[col] = original_values.loc[recommended_products.index, col]
    final_recommendations = recommended_products[['Categories', 'ProductName', 'Price']].copy()
    if 'diabetes' in conditions and 'Tsugar' in recommended_products.columns:
        final_recommendations['Tsugar'] = recommended_products['Tsugar']
    if 'hypertension' in conditions and 'DietFbr' in recommended_products.columns:
        final_recommendations['DietFbr'] = recommended_products['DietFbr']
    return final_recommendations
