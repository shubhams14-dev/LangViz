from flask import Flask, request, send_file
from flask_cors import CORS
import subprocess
import os
import traceback

app = Flask(__name__)
CORS(app)

@app.route('/execute', methods=['POST'])
def execute():
    data = request.json
    code = data['code']
    lang = data['lang']

    if not code.strip():
        return {'status': 'error', 'message': 'Code cannot be blank!'}, 400

    filename = f'visualization_code.{lang}'

    output_file = 'output/visualization.png'
    if os.path.exists(output_file):
        os.remove(output_file)

    with open(filename, 'w') as f:
        f.write(code)

    try:
        if lang == 'python':
                # subprocess.run(['python', filename], check=True)
                subprocess.run(['python', filename], check=True)
        else:
                #subprocess.run(['Rscript', filename], check=True)
                # subprocess.run(['docker', 'exec', 'backend_r-backend_1', 'Rscript', filename], check=True)
                # subprocess.run(['Rscript', filename], check=True)
                # subprocess.run(['docker', 'exec', 'backend-r-backend-1', 'Rscript', f'/app/visualization_code/{filename}'], check=True)
                # subprocess.run(['docker', 'compose', 'exec', '-T', 'r-backend', 'Rscript', f'/app/visualization_code/{filename}'], check=True)
                subprocess.run(['Rscript', filename], check=True)




    except subprocess.CalledProcessError as e:
        return {'status': 'error', 'message': 'Code Execution Failed! Please check your code and selected language.'}, 400

    if not os.path.exists(output_file):
        return {'status': 'error', 'message': 'Visualization not generated!'}, 400

    return {'status': 'success'}


@app.route('/output/<filename>')
def output_file(filename):
    return send_file(os.path.join('output', filename))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

