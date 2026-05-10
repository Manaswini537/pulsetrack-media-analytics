from flask import Flask, jsonify, request
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)

analyzer = SentimentIntensityAnalyzer()

@app.route("/")
def home():
    return {
        "message": "Backend running successfully!"
    }

@app.route("/sentiment", methods=["POST"])
def sentiment():

    data = request.json

    text = data.get("text", "")

    scores = analyzer.polarity_scores(text)

    return jsonify({
        "text": text,
        "sentiment": scores
    })

if __name__ == "__main__":
    app.run(debug=True)