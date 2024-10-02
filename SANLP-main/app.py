from flask import Flask, render_template, request, jsonify
import fasttext

app = Flask(__name__)

@app.route("/")
def Home():
    return render_template('index.html')

@app.route("/submit", methods=['POST'])
def submit():
    if request.method == 'POST':
        model = request.args.get('model')
        query_input = request.form['query_input']

        if model is None:
            model = 'fasttext'

        if model == 'fasttext':
            model = fasttext.load_model('./models/FastText/model.ftz')
            label, score = model.predict(query_input, k=1)
            return jsonify({'result': label[0].replace('__label__','')})
        
        return jsonify({'result': 'Something error'})

if __name__=='__main__':
    app.run()