from jinja2 import Environment, FileSystemLoader, select_autoescape
import json

env = Environment(
    loader = FileSystemLoader("templates"),
    autoescape=select_autoescape()
)

template = env.get_template("index.html.jinja2")

with open("data/venues.json") as venues_file:
    venues_by_month = json.load(venues_file)

    with open("docs/index.html", "w") as output:
        output.write(template.render(months=venues_by_month))
