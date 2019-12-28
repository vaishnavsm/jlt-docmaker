import json
from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['POST'])
def recommend_templates(request):  
    payload = json.loads(request.body)
    l = payload['data'] # json object of key value pairs

    
    # return a list of recommended template URLs
    # try including accuracy/degree of match for analytics
    return JsonResponse({}, status = 200)




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