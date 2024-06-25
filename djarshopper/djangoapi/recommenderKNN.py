from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
import pandas as pd


# Example dataset (replace with your actual dataset loading)
# Assuming 'df' is your DataFrame containing relevant columns
df = pd.read_csv('Initial_Training.csv')

print(df.head())  # Display first few rows of the dataset

# Define your preprocessing steps (adjust based on your data)
numeric_features = ['Price']  # Assuming 'Price' is a numeric feature
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),  # Scale numeric features
        # Add more transformers as needed for other data types
    ],
    remainder='drop'  # Drop columns not specified
)

# Define your pipeline
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('knn', NearestNeighbors(n_neighbors=5, metric='euclidean'))  # Adjust parameters as needed
])


pipeline.fit(df)


# Example function to get recommendations for a given product
def get_recommendations(product_features):
    product_features_transformed = pipeline.named_steps['preprocessor'].transform(product_features)
    distances, indices = pipeline.named_steps['knn'].kneighbors(product_features_transformed)
    print(f"Recommended products indices: {indices}")
    return df.iloc[indices[0]]

# Example usage:
product_features = pd.DataFrame([[10.0]], columns=['Price'])  # Adjust with actual features
recommendations = get_recommendations(product_features)
print("Recommended products:")
print(recommendations)



# Example usage:
# Assuming product_features is a DataFrame or numpy array with the features of the scanned product
product_features = pd.DataFrame([[1.0]], columns=['Price'])  # Example input, adjust with actual features
recommendations = get_recommendations(product_features)
print("Recommended products:")
print(recommendations)