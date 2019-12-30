import docx
from fuzzywuzzy import fuzz

from django.http import JsonResponse
import json
import os
from rest_framework.decorators import api_view

TEMPLATE_DIRECTORY = '' #TODO

def get_template_fields(directory):
    """Returns dictionary of template and the fields it has.""" 
    output_dict = {}
    for file_name in os.listdir(directory):
        if file_name.endswith(".docx"):
            doc_path = os.path.join(directory, file_name)
            doc = docx.Document(doc_path)
            field_names = []
            for docpara in doc.paragraphs:
                tokens = docpara.text.split()
                for token in tokens:
                    if token.startswith("<<") and token.endswith(">>"):
                        field_name = token[2:-2]
                        field_name = field_name.replace("_", " ")
                        field_name = field_name.lower() 
                        field_names.append(field_name)
            output_dict[file_name] = field_names
    return output_dict


def find_field_column_mapping(field_names, column_names):
    """Returns mapping between field_names and column_names"""
    mapping = {}
    max_ratios = [] 
    for field_name in field_names:
        max_ratio = None
        max_column_name = None
        for column_name in column_names:
            ratio = fuzz.ratio(column_name, field_name)
            if not max_ratio or max_ratio < ratio:
                max_ratio = ratio
                max_column_name = column_name
        mapping[field_name] = max_column_name
        max_ratios.append(max_ratio)
    avg_ratio = sum(max_ratios) / len(max_ratios)
    return mapping, avg_ratio


@api_view(['POST'])
def recommend_templates(request):  
    payload = json.loads(request.body)
    l = payload['data'] # json object of key value pairs
    column_names = l['column_names']

    template_fields = get_template_fields(TEMPLATE_DIRECTORY)
    recommendations = []
    for template in template_fields:
        field_names = template_fields[template]
        mapping, avg_ratio = find_field_column_mapping(field_names, column_names)
        dict_ = {}
        dict_['template_file'] = template
        dict_['mapping'] = mapping
        dict_['score'] = avg_ratio
        recommendations.append(dict_)

    # return a list of recommended template URLs
    # try including accuracy/degree of match for analytics
    return JsonResponse(recommendations, status = 200)




# will be called multiple times for batch filling
@api_view(['POST'])
def fill_template(request):  
    payload = json.loads(request.body)
    l = payload['data'] # json object of key value pairs

    # media URL of the template to be filled
    # template must be downloadable at http://<server_url>/media/<template-name>
    template = payload['template'] 

    return JsonResponse({}, status = 200)




@api_view(['POST'])
def find_difference_and_batch_apply(request):  
    payload = json.loads(request.body)
    l = payload['data'] # json object of key value pairs

    # media URL of the template
    template = payload['template'] 

    # modified template. binary docx format
    modified = payload['modified'] 

    # TODO: Leave this for akshay

    return JsonResponse({}, status = 200)