# from sklearn.preprocessing import StandardScaler
# from sklearn.neighbors import NearestNeighbors
# from sklearn.pipeline import Pipeline
# from sklearn.compose import ColumnTransformer
# import pandas as pd
# import re


# #this file is for the initial training of the knn model and has only limited data from the dataset as called in the csv

# # Example dataset (replace with your actual dataset loading)
# # Assuming 'df' is your DataFrame containing relevant columns
# df = pd.read_csv('Training_Test2.csv')

# print(df.head())  # Display first few rows of the dataset

# # Define your preprocessing steps (adjust based on your data)
# # numeric_features = ['Price']  # Assuming 'Price' is a numeric feature
# # preprocessor = ColumnTransformer(
# #     transformers=[
# #         ('num', StandardScaler(), numeric_features),  # Scale numeric features
# #         # Add more transformers as needed for other data types
# #     ],
# #     remainder='drop'  # Drop columns not specified
# # )

# def parse_nutritional_facts(nutritional_facts_str):
#     facts = re.findall(r'(\w+)\(([\d.]+)g?\)', nutritional_facts_str)
#     return {fact[0]: float(fact[1]) for fact in facts}


# # Define your pipeline, pwede rin ibahin yung number ng neighbor based on preference
# # pipeline = Pipeline([
# #     ('preprocessor', preprocessor),
# #     ('knn', NearestNeighbors(n_neighbors=3, metric='euclidean'))  # Adjust parameters as needed
# # ])
# nutritional_facts_df = df['NutritionalFacts'].apply(parse_nutritional_facts).apply(pd.Series)

# df_combined = pd.concat([df.drop(columns=['NutritionalFacts']), nutritional_facts_df], axis=1)


# # Define your preprocessing steps
# numeric_features = nutritional_facts_df.columns.tolist()
# preprocessor = ColumnTransformer(
#     transformers=[
#         ('num', StandardScaler(), numeric_features),  # Scale numeric features
#     ],
#     remainder='drop'  # Drop columns not specified
# )

# # Define your pipeline
# pipeline = Pipeline([
#     ('preprocessor', preprocessor),
#     ('knn', NearestNeighbors(n_neighbors=3, metric='euclidean'))  # Adjust parameters as needed
# ])


# pipeline.fit(df)


# # # Example function to get recommendations for a given product
# # def get_recommendations(product_features):
# #     product_features_transformed = pipeline.named_steps['preprocessor'].transform(product_features)
# #     distances, indices = pipeline.named_steps['knn'].kneighbors(product_features_transformed)
# #     print(f"Recommended products indices: {indices}")
# #     return df.iloc[indices[0]]

# # # Example usage:
# # product_features = pd.DataFrame([[10.0]], columns=['Price'])  # Adjust with actual features
# # recommendations = get_recommendations(product_features)
# # print("Recommended products:")
# # print(recommendations)

# # Example function to get recommendations for a given product
# def get_recommendations(product_features):
#     product_features_transformed = pipeline.named_steps['preprocessor'].transform(product_features)
#     distances, indices = pipeline.named_steps['knn'].kneighbors(product_features_transformed)
#     print(f"Recommended products indices: {indices}")
#     return df_combined.iloc[indices[0]]

# # Example usage:
# # Assuming we want to get recommendations based on the nutritional facts of a product
# product_features = pd.DataFrame([{
#     'Calories': 160,
#     'TotalFat': 8,
#     'SatFat': 2,
#     'TransFat': 0,
#     # Add other nutritional facts as needed
# }], columns=numeric_features)

# recommendations = get_recommendations(product_features)
# print("Recommended products:")
# print(recommendations)

#working model but the recommendation is not accurate enough
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
import pandas as pd
import re

# Load your dataset
df = pd.read_csv('Training_Test2.csv')

# Display first few rows of the dataset
selected_rows_df = df.iloc[10:24]
print(selected_rows_df)
# Function to parse 'NutritionalFacts' and extract numeric values
def parse_nutritional_facts(nutritional_facts_str):
    facts = re.findall(r'(\w+)\(([\d.]+)\w?\)', nutritional_facts_str)
    return {fact[0]: float(fact[1]) for fact in facts}

# Apply parsing function to 'NutritionalFacts' column
nutritional_facts_df = df['NutritionalFacts'].apply(parse_nutritional_facts).apply(pd.Series)

# Combine the parsed nutritional facts with the original dataframe
df_combined = pd.concat([df.drop(columns=['NutritionalFacts']), nutritional_facts_df], axis=1)

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

# Example function to get recommendations for a given product
def get_recommendations(product_features):
    product_features_transformed = pipeline.named_steps['preprocessor'].transform(product_features)
    distances, indices = pipeline.named_steps['knn'].kneighbors(product_features_transformed)
    print(f"Recommended products indices: {indices}")
    return df.iloc[indices[0]]

# Example usage:
# Assuming we want to get recommendations based on the nutritional facts of a product
product_features = pd.DataFrame([{
    'Calories': 150,
    'TotalFat': 12,
    'SatFat': 7,
    'TransFat': 0,
    'Cholesterol': 0,
    'Sodium': 30,
    'TCarbs': 10,
    'DietFbr': 2,
    'Tsugar': 2,
}], columns=numeric_features)

recommendations = get_recommendations(product_features)
print("Recommended products:")
print(recommendations)
