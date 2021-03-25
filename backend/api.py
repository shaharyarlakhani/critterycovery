from flask import Flask, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import fields
import json									# jsonify
from flask import jsonify
from gitlab import stats					# gitlab.py


# Just another api.py, but using Marshmallow
# ALL UNTESTED BECAUSE I CAN'T ACCESS THE DATABASE

# https://flask-marshmallow.readthedocs.io/en/latest/

app = Flask(
	__name__,
	static_folder="../frontend/build/static",
	template_folder="../frontend/build"
)
CORS(app)

db_user = "postgres"
db_password = "pleaseWork"
db_name = "104.197.145.153/postgres"

app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{db_user}:{db_password}@{db_name}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

ma = Marshmallow(app)


# model of Country for SQLAlchemy
class countries_table(db.Model):
	name = db.Column(db.Unicode, primary_key=True)
	alpha2_code = db.Column(db.Unicode)
	alpha3_code = db.Column(db.Unicode)
	total_pop = db.Column(db.Integer)
	capital = db.Column(db.Unicode)
	region = db.Column(db.Unicode)
	subregion = db.Column(db.Unicode)
	latitude = db.Column(db.Float)
	longitude = db.Column(db.Float)
	area = db.Column(db.Integer)
	gini_index = db.Column(db.Float)
	flag = db.Column(db.Unicode) # it's a link, is it a string?

# model of Species for SQLAlchemy
class Species(db.Model):
	scientific_name = db.Column(db.Unicode, primary_key=True)
	subspecies = db.Column(db.Unicode)
	kingdom = db.Column(db.Unicode)
	phylum = db.Column(db.Unicode)
	_class = db.Column(db.Unicode)
	_order = db.Column(db.Unicode)
	family = db.Column(db.Unicode)
	genus = db.Column(db.Unicode)
	common_name = db.Column(db.Unicode)
	population_trend = db.Column(db.Unicode)
	marine = db.Column(db.Boolean)
	freshwater = db.Column(db.Boolean)
	terrestrial = db.Column(db.Boolean)

# model of Habitat for SQLAlchemy
class Habitat(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.Unicode)
	marine = db.Column(db.Boolean) 
	reported_marine_area = db.Column(db.Float)
	reported_terrestrial_area = db.Column(db.Float)
	countries = db.Column(db.Unicode)
	iucn_category = db.Column(db.Integer)
	designation = db.Column(db.Unicode)
	link = db.Column(db.Unicode)

# model for connection between Species and Country
class CountrySpeciesLink(db.Model):
	id = db.Column(db.Integer, primary_key=True)  # this field needs to be added to db
	scientific_name = db.Column(db.Unicode)
	alpha2_code = db.Column(db.Unicode)

# SCHEMA FOR MARSHMALLOW
class CountrySchema(ma.Schema):
	class Meta:
		ordered = True

	name = fields.String(required=True)
	alpha2_code = fields.String(required=False)
	alpha3_code = fields.String(required=False)
	total_pop = fields.Integer(required=False)
	capital = fields.String(required=False)
	region = fields.String(required=False)
	subregion =fields.String(required=False)
	latitude = fields.Float(required=False)
	longitude = fields.Float(required=False)
	area = fields.Integer(required=False)
	gini_index = fields.Float(required=False)
	flag = fields.String(required=False) # it's a link, is it a string?


class SpeciesSchema(ma.Schema):
	class Meta:
		ordered = True

	scientific_name = fields.String(required=True)
	subspecies = fields.String(required=False)
	kingdom = fields.String(required=False)
	phylum = fields.String(required=False)
	_class = fields.String(required=False)
	_order = fields.String(required=False)
	family = fields.String(required=False)
	genus = fields.String(required=False)
	common_name = fields.String(required=False)
	population_trend = fields.String(required=False)
	marine = fields.Boolean(required=False)
	freshwater = fields.Boolean(required=False)
	terrestrial = fields.Boolean(required=False)


class HabitatSchema(ma.Schema):
	class Meta:
		ordered = True

	id = fields.Integer(required=True)
	name = fields.String(required=False)
	marine = fields.Boolean(required=False)
	reported_marine_area = fields.Float(required=False)
	reported_terrestrial_area = fields.Float(required=False)
	countries = fields.String(required=False)
	iucn_category = fields.Integer(required=False)
	designation = fields.String(required=False)
	link = fields.String(required=False)


class CountrySpeciesLinkSchema(ma.Schema):
	class Meta:
		ordered = True

	id = fields.Integer(required=True)  # this field needs to be added to db
	scientific_name = fields.String(required=False)
	alpha2_code = fields.String(required=False)

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

specie_schema = SpeciesSchema()
species_schema = SpeciesSchema(many=True)

habitat_schema = HabitatSchema()
habitats_schema = HabitatSchema(many=True)

country_species_link_schema = CountrySpeciesLinkSchema()
countries_species_link_schema = CountrySpeciesLinkSchema(many=True)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
	return render_template("index.html")

@app.route("/api/name")
def name():
	return {"name": "CRITTERYCOVERY"}

@app.route("/api/gitlabstats")
def gitlabstats():
	return stats()


# get all countries
@app.route("/api/countries")
def get_countries():
	countries = countries_table.query.all()
	response = countries_schema.dump(countries)

	return jsonify({"countries" : response})

# get a single country by name
# https://flask-sqlalchemy.palletsprojects.com/en/2.x/queries/#querying-records
@app.route("/api/countries/name=<name>", methods=["GET"])
def get_country(name):
	country = countries_table.query.filter_by(name=name).first()

	if country is None:
		print("country ", name, " does not exist")
		print("How to make error page?")
		return {}

	response = country_schema.dump(country)

	return jsonify({"country" : response})


if __name__ == "__main__":
	app.run(host="0.0.0.0", port=80, threaded=True, debug=True)
