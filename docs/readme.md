

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

<style>
h1 {
  display:none
}
</style>

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

	- [Chelsea CultureMap Documentation](#chelsea-culturemap-documentation)
		- [Introduction](#introduction)
		- [Editing Data](#editing-data)

<!-- /TOC -->

## Chelsea CultureMap Documentation

### Introduction

Chelsea CultureMap is an online [cultural asset mapping](http://www.artscapediy.org/Creative-Placemaking-Toolbox/Who-Are-My-Stakeholders-and-How-Do-I-Engage-Them/An-Introduction-to-Cultural-Asset-Mapping.aspx) platform built on top of [ArcGIS Online](https://www.arcgis.com/home/index.html), [Survey123](https://survey123.arcgis.com/), and the [Esri-Leaflet libary](https://esri.github.io/esri-leaflet/). This documentation is for map administrators and for those who would like to extend the platform. Basic administration and data management do not require programming or web development experience, while more advanced customization requires some knowledge of HTML, CSS, and Javascript.

CultureMap works in the following manner:

- Public users can submit new assets via [the survey](https://arcg.is/0XGP9S), which is hosted on [Survey123](https://survey123.arcgis.com/). Public users can access the survey via the [main CultureMap page](https://tohorner.github.io/CultureMap/dist/).
- User-submitted data is stored as a [hosted feature layer](http://doc.arcgis.com/en/arcgis-online/manage-data/hosted-web-layers.htm) on ArcGIS Online.
- Administrators can edit cultural asset data in tabular form, using the editor application, or with desktop ArcMap software (see ["Editing Data"]()).

### Editing Data
