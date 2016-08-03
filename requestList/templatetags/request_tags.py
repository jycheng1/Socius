from django import template

register = template.Library()

@register.inclusion_tag('displayRequests.html')
def render_request(requests):
    context = {'requests': requests}
    return context