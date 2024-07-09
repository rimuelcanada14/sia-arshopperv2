import pandas as pd
import numpy as np
import re
from sklearn.preprocessing import StandardScaler
from scipy.spatial import distance

# Example function to parse nutritional facts
def parse_nutritional_facts(nutritional_facts_str):
    # Check if nutritional_facts_str is NaN (which is float in pandas)
    if pd.isna(nutritional_facts_str):
        return {}  # Return an empty dictionary or handle NaN appropriately

    # Regular expression to extract key-value pairs
    facts = re.findall(r'(\w+)\(([\d.]+)\w?\)', nutritional_facts_str)

    # Convert extracted pairs into a dictionary
    return {fact[0]: float(fact[1]) for fact in facts}

# Load your dataset
file_path = 'TrainingTest2.csv'
df = pd.read_csv(file_path)

# Print the first few rows of the dataset
print("First few rows of the dataset:")
print(df.head())

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
                print("\nRecommendation details for diabetes:")
                print(recommended_products[['Categories', 'ProductName', 'Price', 'NutritionalFacts', 'Tsugar']])
            elif condition == 'hypertension' and 'DietFbr' in recommended_products.columns:
                recommended_products = recommended_products[['ProductName', 'Price', 'Categories', 'NutritionalFacts', 'DietFbr']]
                recommended_products = recommended_products.sort_values(by='DietFbr')
                print("\nRecommendation details for hypertension:")
                print(recommended_products[['Categories', 'ProductName', 'Price', 'NutritionalFacts', 'DietFbr']])
            # Add other condition filters here as per your requirements

    # If no conditions are specified, just filter by category
    if not conditions:
        if category:
            recommended_products = recommended_products[recommended_products['Categories'] == category]

    # Limit the number of recommendations to 3
    recommended_products = recommended_products.head(3)

    # Revert the standardized values back to the original scale
    for col in numeric_features:
        recommended_products[col] = original_values.loc[recommended_products.index, col]

    # Print final recommendations with additional columns based on conditions
    print("\nFinal recommendations:")
    print(recommended_products[['Categories', 'ProductName', 'Price', 'NutritionalFacts']])

    return recommended_products

# Example usage:
product_features = {
    'TotalFat': 0,
    'SatFat': 0,
    'TransFat': 0,
    'Sodium': 2,
    'TCarbs': 20,
    'Tsugar': 15,
    'DietFbr': 5
}  # Example product features, adjust as needed

conditions = ['diabetes']  # Example health conditions, adjust as needed. Set to None for no conditions.
category = 'Biscuits'  # Example product category, adjust as needed

recommendations = get_recommendations_with_healthiness(product_features, conditions=conditions, category=category)


#wag na to gamitin depota, pero here lang to for referrence lang