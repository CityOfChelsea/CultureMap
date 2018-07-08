<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

<style>
h1 {
  display:none
}
</style>


## Chelsea CultureMap Documentation

### Introduction

Chelsea CultureMap is an online [cultural asset mapping](http://www.artscapediy.org/Creative-Placemaking-Toolbox/Who-Are-My-Stakeholders-and-How-Do-I-Engage-Them/An-Introduction-to-Cultural-Asset-Mapping.aspx) platform built on top of [ArcGIS Online](https://www.arcgis.com/home/index.html), [Survey123](https://survey123.arcgis.com/), and the [Esri-Leaflet libary](https://esri.github.io/esri-leaflet/). This documentation is for map administrators and for those who would like to extend the platform. Basic administration and data management do not require programming or web development experience, while more advanced customization requires some knowledge of HTML, CSS, and Javascript.

CultureMap is organized around the following workflow:

- Public users can submit new assets via [the survey](https://arcg.is/0XGP9S), which is hosted on [Survey123](https://survey123.arcgis.com/). Public users can access the survey via the [main CultureMap page](https://tohorner.github.io/CultureMap/dist/).
- User-submitted data is stored as a [hosted feature layer](http://doc.arcgis.com/en/arcgis-online/manage-data/hosted-web-layers.htm) on ArcGIS Online. *User-submitted cultural assets do not display on any public-facing maps until approved by an administrator*.
- Administrators can edit cultural asset data in tabular form, using the editor application, or with desktop ArcMap software (see ["Editing Data"](https://tohorner.github.io/CultureMap/docs/#editing-data)).
- Approved data is then displayed on the main Chelsea CultureMap page, which is hosted for free using [GitHub Pages](https://pages.github.com/).

### CultureMap - the Main Page

The main CultureMap page serves as the primary point where public users interact with the application. The page uses the responsive [Twitter Bootstrap](https://getbootstrap.com/) framework to support both desktop and mobile devices. Users can browse, filter, vote for and search for currently identified cultural assets. They can also access the survey and submit new cultural assets. For a full list of features, consult the [functionality matrix](functionality_matrix.md).

### Working with Survey123

Using [Survey123](https://survey123.arcgis.com/), CultureMap allows users to submit cultural assets for administrator review. When respondents submit a survey, an entry is added to the Core Feature Service, hosted on ArcGIS Online. The survey can be edited by logging into Survey123 and downloading the survey and opening it in Survey123 Connect, a free desktop application, which can be downloaded [here](http://doc.arcgis.com/en/survey123/download/). Detailed Survey123 documentation is available [here](https://doc.arcgis.com/en/survey123/desktop/create-surveys/createfirstsurvey.htm).

![](assets/markdown-img-paste-20180708134726427.png)
*Survey123 dashboard, with survey download displayed.*

With the survey open in Survey123 Connect, administrators can edit question content, add questions, and change question types. Keep in mind, however, that all submitted data fields must correspond with a data field in CultureMaps's Core Feature Service hosted on ArcGIS Online. Both the name and data type (e.g. integer, text) must match. (Managing and editing data is covered below.)

Survey123 Connect allows users to create and edit surveys in Microsoft Excel using the [XLS Forms specification](http://xlsform.org/). Esri has published [detailed documentation](https://doc.arcgis.com/en/survey123/desktop/create-surveys/xlsformessentials.htm) for how to work with XLS Forms to create and edit Survey123 surveys.

![](assets/markdown-img-paste-20180708135551773.png)
*Screenshot from the OS X version of Survey123 Connect. The survey specification can be opened in Microsoft Excel by clicking on the icon in the upper left-hand corner. (Survey123 Connect is available for Windows, but the user interface may not be identical.)*

![](assets/markdown-img-paste-20180708141104263.png)
*Screenshot from an Survey123 survey, open for editing in Microsoft Excel*

### Editing and Managing Data



#### Approving user-submitted cultural assets

#### Adding/removing photos

#### Managing user "voting" data

### Advanced Customization

#### Custom URL

#### Adding/removing cultural asset categories

#### Custom styling

#### Hosting CultureMap
