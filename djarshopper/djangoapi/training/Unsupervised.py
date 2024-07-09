import pandas as pd
import numpy as np
import re
from sklearn.preprocessing import StandardScaler
from scipy.spatial import distance

# Load your dataset
file_path = 'LatestDataset.csv'
df = pd.read_csv(file_path)

# Print the first few rows of the dataset
print("First few rows of the dataset:")
print(df.head())

# Fill NaN values with an empty string and convert all entries to strings
df['NutritionalFacts'] = df['NutritionalFacts'].fillna('').astype(str)

# Parse 'NutritionalFacts' column to extract numeric values
def parse_nutritional_facts(nutritional_facts_str):
    facts = re.findall(r'(\w+)\(([\d.]+)\w?\)', nutritional_facts_str)
    return {fact[0]: float(fact[1]) for fact in facts}

# Apply parsing function to 'NutritionalFacts' column
nutritional_facts_df = df['NutritionalFacts'].apply(parse_nutritional_facts).apply(pd.Series)

# Combine the parsed nutritional facts with the original dataframe
df_combined = pd.concat([df[['Categories', 'ProductName', 'Price', 'NutritionalFacts']], nutritional_facts_df], axis=1)

# Define the numeric features
numeric_features = nutritional_facts_df.columns.tolist()

# List of unnecessary columns (if any)
unnecessary_columns = ['Iron', 'Calorie', 'Carbohydrate', 'VitA', 'Iodine', 'VitC', 'Protein', 'Calcium']

# Remove unnecessary columns from numeric_features
numeric_features = [col for col in numeric_features if col not in unnecessary_columns]

# Store the original values for displaying later
original_values = df_combined[numeric_features].copy()

# Standardize the numeric features
scaler = StandardScaler()
df_combined[numeric_features] = scaler.fit_transform(df_combined[numeric_features].fillna(0))

# Function to get recommendations based on health condition(s) and category
def get_recommendations_with_healthiness(product_features, conditions=None, category=None):
    # Create a DataFrame from product_features
    product_df = pd.DataFrame([product_features])

    # Ensure all required columns are present in the DataFrame
    for col in numeric_features:
        if col not in product_df.columns:
            product_df[col] = 0.0  # Default value

    # Standardize the product features
    product_features_scaled = scaler.transform(product_df[numeric_features].fillna(0))

    # Calculate Euclidean distances
    distances = df_combined[numeric_features].apply(lambda row: distance.euclidean(row, product_features_scaled[0]), axis=1)
    df_combined['Distance'] = distances

    # Sort by distance
    recommended_products = df_combined.sort_values(by='Distance').copy()

    # Print recommended products to debug
    print("Recommended products before filtering:")
    print(recommended_products[['Categories', 'ProductName', 'Price']])

    # Apply condition-specific filtering and sorting for healthier alternatives
    if conditions:
        for condition in conditions:
            if condition == 'diabetes' and 'Tsugar' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'Tsugar']]
                recommended_products = recommended_products.sort_values(by='Tsugar')
            elif condition == 'gastrointestinal' and 'DietFbr' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'DietFbr']]
                recommended_products = recommended_products.sort_values(by='DietFbr', ascending=False)
            elif condition == 'hypertension' and 'Sodium' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName','Price', 'Categories', 'NutritionalFacts', 'Sodium']]
                recommended_products = recommended_products.sort_values(by='Sodium')
            elif condition == 'uti' and all(col in recommended_products.columns for col in ['Tsugar', 'DietFbr']):
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'Tsugar', 'DietFbr']]
                recommended_products = recommended_products.sort_values(by=['Tsugar', 'DietFbr'])
            elif condition == 'skin diseases' and 'TotalFat' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'TotalFat']]
                recommended_products = recommended_products.sort_values(by='TotalFat', ascending=False)
            elif condition == 'liver diseases' and all(col in recommended_products.columns for col in ['Tsugar', 'Sodium']):
                recommended_products = recommended_products[['ProductName', 'Price',  'Categories','NutritionalFacts', 'Tsugar', 'Sodium']]
                recommended_products = recommended_products.sort_values(by=['Tsugar', 'Sodium'])
            elif condition == 'kidney diseases' and 'Sodium' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'Sodium']]
                recommended_products = recommended_products.sort_values(by='Sodium')

    # Apply category-specific filtering
    if category:
        recommended_products = recommended_products[recommended_products['Categories'] == category]

    # If no conditions, recommend similar items in the same category
    if not conditions:
        similar_products = recommended_products.copy()
        similar_products = similar_products[similar_products['Categories'] == category].head(3)

        # Revert the standardized values back to the original scale
        for col in numeric_features:
            similar_products[col] = original_values.loc[similar_products.index, col]

        print("\nRecommendations for similar items in the same category:")
        print(similar_products[['Categories', 'ProductName', 'Price', 'NutritionalFacts']])
        return similar_products

    # Limit the number of recommendations to 3
    recommended_products = recommended_products.head(3)

    # Revert the standardized values back to the original scale
    for col in numeric_features:
        recommended_products[col] = original_values.loc[recommended_products.index, col]

    # Prepare a DataFrame for final recommendations with condition-specific columns
    final_recommendations = recommended_products[['Categories', 'ProductName', 'Price']].copy()

    # Add condition-specific columns if conditions are present
    if 'diabetes' in conditions and 'Tsugar' in recommended_products.columns:
        final_recommendations['Tsugar'] = recommended_products['Tsugar']
    if 'hypertension' in conditions and 'DietFbr' in recommended_products.columns:
        final_recommendations['DietFbr'] = recommended_products['DietFbr']

    # Print final recommendations with all relevant columns
    print("\nFinal recommendations:")
    print(final_recommendations)

    return recommended_products

# Example usage:
product_features = {
    'TotalFat': 5,
    'SatFat': 0,
    'TransFat': 0,
    'Sodium': 2,
    'TCarbs': 15,
    'Tsugar': 15,
    'DietFbr': 5
}  # Example product features, adjust as needed

conditions = ['diabetes', 'hypertension']  # Example health conditions, adjust as needed
category = 'Biscuits'  # Example product category, adjust as needed

recommendations = get_recommendations_with_healthiness(product_features, conditions=conditions, category=category)
