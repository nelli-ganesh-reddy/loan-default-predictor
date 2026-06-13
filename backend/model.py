import joblib
import json
import numpy as np
import os

# paths to our saved files
MODEL_PATH   = os.path.join(os.path.dirname(__file__), 'ml/model.pkl')
FEATURES_PATH = os.path.join(os.path.dirname(__file__), 'ml/feature_columns.json')
ENCODING_PATH = os.path.join(os.path.dirname(__file__), 'ml/encoding_map.json')

# load model and files when server starts
model         = joblib.load(MODEL_PATH)
feature_cols  = json.load(open(FEATURES_PATH))
encoding_map  = json.load(open(ENCODING_PATH))

def predict(data: dict):

    # step 1 — encode text columns using our saved encoding map
    # example: "Full-time" → 0, "Bachelor's" → 0
    for col, mapping in encoding_map.items():
        if col in data:
            data[col] = mapping[data[col]]

    # step 2 — arrange values in correct column order
    # model expects exact same order as training
    values = [data[col] for col in feature_cols]

    # step 3 — convert to numpy array (what sklearn expects)
    input_array = np.array(values).reshape(1, -1)

    # step 4 — get prediction (0 or 1)
    prediction = int(model.predict(input_array)[0])

    # step 5 — get confidence percentage
    # predict_proba gives probability for each class [no default, default]
    confidence = round(model.predict_proba(input_array)[0][prediction] * 100, 2)

    return prediction, confidence