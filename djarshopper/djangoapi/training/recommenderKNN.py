import warnings
from sklearn.neighbors import NearestNeighbors
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
import pandas as pd
import re
import os

# Load your dataset
file_path = os.path.join(os.path.dirname(__file__), 'TrainingTest2.csv')
df = pd.read_csv(file_path)

# Function to parse 'NutritionalFacts' and extract numeric values
def parse_nutritional_facts(nutritional_facts_str):
    facts = re.findall(r'(\w+)\(([\d.]+)\w?\)', nutritional_facts_str)
    return {fact[0]: float(fact[1]) for fact in facts}

# Apply parsing function to 'NutritionalFacts' column
nutritional_facts_df = df['NutritionalFacts'].apply(parse_nutritional_facts).apply(pd.Series)

# Ensure 'NutritionalFacts' column is retained in nutritional_facts_df
nutritional_facts_df['NutritionalFacts'] = df['NutritionalFacts']

# Combine the parsed nutritional facts with the original dataframe
df_combined = pd.concat([df.drop(columns=['NutritionalFacts']), nutritional_facts_df], axis=1)

# Define your preprocessing steps
numeric_features = nutritional_facts_df.columns.tolist()

# Filter out non-numeric columns (assuming all others are non-numeric)
numeric_features = [col for col in numeric_features if nutritional_facts_df[col].dtype in ['int64', 'float64']]

# List of unnecessary columns
unnecessary_columns = ['Iron', 'Calorie', 'Carbohydrate', 'VitA', 'Iodine', 'VitC', 'Protein', 'Calcium']

# Remove unnecessary columns from numeric_features
numeric_features = [col for col in numeric_features if col not in unnecessary_columns]

# Include SimpleImputer and StandardScaler to handle missing values and scale numeric features
preprocessor = ColumnTransformer(
    transformers=[
        ('num', Pipeline([
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())
        ]), numeric_features)  # Impute and scale numeric features
    ],
    remainder='drop'  # Drop columns not specified
)

# Define your pipeline
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('knn', NearestNeighbors(n_neighbors=3, metric='euclidean'))  # Adjust parameters as needed
])

# Fit the pipeline
pipeline.fit(df_combined)

# Function to get recommendations based on health condition(s)
def get_recommendations_with_healthiness(product_features, conditions):
    warnings.filterwarnings('ignore', category=UserWarning, append=True)
    
    # Create a DataFrame from product_features and transform it using the preprocessor
    product_df = pd.DataFrame(product_features, index=[0])
    product_features_transformed = pipeline.named_steps['preprocessor'].transform(product_df)

    # Convert transformed features back to DataFrame with appropriate column names
    transformed_df = pd.DataFrame(product_features_transformed, columns=numeric_features)

    # Concatenate back with non-numeric features (if any)
    if 'NutritionalFacts' in product_df.columns:
        transformed_df['NutritionalFacts'] = product_df['NutritionalFacts']

    # Perform nearest neighbors search on the transformed data
    distances, indices = pipeline.named_steps['knn'].kneighbors(transformed_df)

    recommended_products = df_combined.iloc[indices[0]].copy()

    # Apply condition-specific filtering and sorting for healthier alternatives
    if isinstance(conditions, str):
        conditions = [conditions]

    for condition in conditions:
        if condition == 'diabetes' and 'Tsugar' in recommended_products.columns:
            recommended_products = recommended_products[['ProductName', 'NutritionalFacts', 'Tsugar']]
            recommended_products = recommended_products.sort_values(by='Tsugar')
        elif condition == 'gastrointestinal' and 'DietFbr' in recommended_products.columns:
            recommended_products = recommended_products[['ProductName', 'NutritionalFacts', 'DietFbr']]
            recommended_products = recommended_products.sort_values(by='DietFbr', ascending=False)
        elif condition == 'hypertension' and 'Sodium' in recommended_products.columns:
            recommended_products = recommended_products[['ProductName', 'NutritionalFacts', 'Sodium']]
            recommended_products = recommended_products.sort_values(by='Sodium')
        elif condition == 'uti' and all(col in recommended_products.columns for col in ['Tsugar', 'DietFbr']):
            recommended_products = recommended_products[['ProductName', 'NutritionalFacts', 'Tsugar', 'DietFbr']]
            recommended_products = recommended_products.sort_values(by=['Tsugar', 'DietFbr'])
        elif condition == 'skin diseases' and 'TotalFat' in recommended_products.columns:
            recommended_products = recommended_products[['ProductName', 'NutritionalFacts', 'TotalFat']]
            recommended_products = recommended_products.sort_values(by='TotalFat', ascending=False)
        elif condition == 'liver diseases' and all(col in recommended_products.columns for col in ['Tsugar', 'Sodium']):
            recommended_products = recommended_products[['ProductName', 'NutritionalFacts', 'Tsugar', 'Sodium']]
            recommended_products = recommended_products.sort_values(by=['Tsugar', 'Sodium'])
        elif condition == 'kidney diseases' and 'Sodium' in recommended_products.columns:
            recommended_products = recommended_products[['ProductName', 'NutritionalFacts', 'Sodium']]
            recommended_products = recommended_products.sort_values(by='Sodium')

    return recommended_products
