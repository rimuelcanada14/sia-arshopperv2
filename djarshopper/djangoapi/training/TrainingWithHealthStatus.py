from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
import pandas as pd
import re

# Load your dataset
df = pd.read_csv('Training_Test2.csv')

# Function to parse 'NutritionalFacts' and extract numeric values
def parse_nutritional_facts(nutritional_facts_str):
    facts = re.findall(r'(\w+)\(([\d.]+)\w?\)', nutritional_facts_str)
    return {fact[0]: float(fact[1]) for fact in facts}

# Apply parsing function to 'NutritionalFacts' column
nutritional_facts_df = df['NutritionalFacts'].apply(parse_nutritional_facts).apply(pd.Series)

# Combine the parsed nutritional facts with the original dataframe
df_combined = pd.concat([df, nutritional_facts_df], axis=1)

# Define your preprocessing steps
numeric_features = nutritional_facts_df.columns.tolist()

# Include SimpleImputer to handle missing values
preprocessor = ColumnTransformer(
    transformers=[
        ('num', Pipeline([
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())
        ]), numeric_features),  # Impute and scale numeric features
    ],
    remainder='drop'  # Drop columns not specified
)

# Define your pipeline
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('knn', NearestNeighbors(n_neighbors=3, metric='euclidean'))  # Adjust parameters as needed
])

# Fit the pipeline
pipeline.fit(df_combined[numeric_features])

# Function to get recommendations based on health condition
def get_recommendations_with_healthiness(product_features, condition):
    product_features_transformed = pipeline.named_steps['preprocessor'].transform(product_features[numeric_features])
    distances, indices = pipeline.named_steps['knn'].kneighbors(product_features_transformed)
    
    recommended_products = df_combined.iloc[indices[0]]
    
    # Apply condition-specific filtering
    if condition == 'diabetes':
        recommended_products = recommended_products.sort_values(by='Tsugar')
    
    # Find the original product name (assuming it's provided in the product_features)
    original_product_name = product_features.get('ProductName', ['Unknown'])[0]
    
    print(f"Original product name: {original_product_name}")
    print("Recommended products details:")
    print(recommended_products[['ProductName', 'NutritionalFacts', 'Tsugar']])

    return recommended_products

# Example usage:
product_features = pd.DataFrame([{
    'ProductName': 'ExampleProduct',
    'Calories': 50,
    'TotalFat': 5,
    'SatFat': 2,
    'TransFat': 0,
    'Cholesterol': 0,
    'Sodium': 50,
    'TCarbs': 19,
    'DietFbr': 2,
    'Tsugar': 10,
}], columns=['ProductName'] + numeric_features)

# Get recommendations for a user with diabetes
recommendations = get_recommendations_with_healthiness(product_features, condition='diabetes')
# print("Recommended products:")
# print(recommendations)
