// ------------------------------
// Vars
// ------------------------------

// Save the current preferences
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;



// ------------------------------
// Helper Functions
// ------------------------------

/**
 * Set Photoshop to use pixels and display no dialogs.
 * @return {void}
 */
function configSettings() {
  app.preferences.rulerUnits = Units.PIXELS;
  app.preferences.typeUnits = TypeUnits.PIXELS;
  app.displayDialogs = DialogModes.NO;
}

/**
 * Reset the application preferences.
 * @return {void}
 */
function resetSettings() {
  app.preferences.rulerUnits = startRulerUnits;
  app.preferences.typeUnits = startTypeUnits;
  app.displayDialogs = startDisplayDialogs;
}

/**
 * Check whether a layer is a Smart Object
 * @param  {ArtLayer}  layer
 * @return {Boolean}
 */
function isSmartObject(layer) {
  return layer.kind === LayerKind.SMARTOBJECT;
}

/**
 * Create smartobject from specified layer (default is active layer).
 * Based on http://goo.gl/FdLPLu?gdriveurl from this list: http://elevatestudios.com/blog/photoshop-scripts-and-extensions-to-improve-your-workflow
 * @param  {ArtLayer}  layer
 * @return {ArtLayer}
 */
function createSmartObject(layer) {
  if (!layer) {
    alert("Empty layer passed to createSmartObject: " + e);
    return undefined;
  }

  // TODO: Check if layer is already a Smart Object
  // if (isSmartObject(layer)) {
  //   return layer;
  // }

  // Make sure layer is active so we can manipulate it
  if (doc.activeLayer !== layer) {
    doc.activeLayer = layer;
  }

  // Convert layer to Smart Object
  try {
    var idNewPlacedLayer = stringIDToTypeID("newPlacedLayer");
    executeAction(idNewPlacedLayer, undefined, DialogModes.NO);
    return doc.activeLayer;
  } catch(e) {
    alert("createSmartObject failed: " + e);
    return undefined;
  }
}

/**
 * Rasterize an entire layer
 * @param  {ArtLayer}  layer
 * @return {Boolean}
 */
function rasterize(layer) {
  // See "Scripting Constants" section in docs for different RasterizeType values
  return layer.rasterize(RasterizeType.ENTIRELAYER);
}

/**
 * Add color overlay to active layer.
 * @return {void}
 */
function addColorOverlayToActiveLayer() {
  var ref13 = new ActionReference();
  var idPrpr = charIDToTypeID( "Prpr" );
  var idLefx = charIDToTypeID( "Lefx" );
  ref13.putProperty( idPrpr, idLefx );

  var idLyr = charIDToTypeID( "Lyr " );
  var idOrdn = charIDToTypeID( "Ordn" );
  var idTrgt = charIDToTypeID( "Trgt" );
  ref13.putEnumerated( idLyr, idOrdn, idTrgt );

  var desc17 = new ActionDescriptor();
  var idnull = charIDToTypeID( "null" );
  desc17.putReference( idnull, ref13 );

  var desc18 = new ActionDescriptor();
  var idScl = charIDToTypeID( "Scl " );
  var idPrc = charIDToTypeID( "#Prc" );
  desc18.putUnitDouble( idScl, idPrc, 100.000000 );

  var desc19 = new ActionDescriptor();
  var idenab = charIDToTypeID( "enab" );
  desc19.putBoolean( idenab, true );

  var idpresent = stringIDToTypeID( "present" );
  desc19.putBoolean( idpresent, true );

  var idshowInDialog = stringIDToTypeID( "showInDialog" );
  desc19.putBoolean( idshowInDialog, true );

  var idMd = charIDToTypeID( "Md  " );
  var idBlnM = charIDToTypeID( "BlnM" );
  var idNrml = charIDToTypeID( "Nrml" );
  desc19.putEnumerated( idMd, idBlnM, idNrml );

  var desc20 = new ActionDescriptor();
  var idClr = charIDToTypeID( "Clr " );

  var idRd = charIDToTypeID( "Rd  " );
  desc20.putDouble( idRd, 255.000000 );
  var idGrn = charIDToTypeID( "Grn " );
  desc20.putDouble( idGrn, 255.000000 );
  var idBl = charIDToTypeID( "Bl  " );
  desc20.putDouble( idBl, 255.000000 );
  var idRGBC = charIDToTypeID( "RGBC" );
  desc19.putObject( idClr, idRGBC, desc20 );

  var idOpct = charIDToTypeID( "Opct" );
  var idPrc = charIDToTypeID( "#Prc" );
  desc19.putUnitDouble( idOpct, idPrc, 100.000000 );

  var idSoFi = charIDToTypeID( "SoFi" );
  desc18.putObject( idSoFi, idSoFi, desc19 );

  var idT = charIDToTypeID( "T   " );
  var idLefx = charIDToTypeID( "Lefx" );
  desc17.putObject( idT, idLefx, desc18 );

  var idsetd = charIDToTypeID( "setd" );
  executeAction( idsetd, desc17, DialogModes.NO );
}

/**
 * Select the entire document
 * @return {void}
 */
function selectAll() {
  var ref7   = new ActionReference();
  var idChnl = charIDToTypeID("Chnl");
  var idfsel = charIDToTypeID("fsel");
  ref7.putProperty(idChnl, idfsel);

  var desc9  = new ActionDescriptor();
  var idnull = charIDToTypeID("null");
  desc9.putReference(idnull, ref7);

  var idT    = charIDToTypeID("T   ");
  var idOrdn = charIDToTypeID("Ordn");
  var idAl   = charIDToTypeID("Al  ");
  desc9.putEnumerated(idT, idOrdn, idAl);

  var idsetd = charIDToTypeID("setd");
  executeAction(idsetd, desc9, DialogModes.NO);
}

/**
 * Create a new black fill layer.
 * @return {void}
 */
function addBlackFillLayer() {
  var idMk = charIDToTypeID( "Mk  " );
  var desc12 = new ActionDescriptor();
  var idnull = charIDToTypeID( "null" );
  var ref2 = new ActionReference();
  var idcontentLayer = stringIDToTypeID( "contentLayer" );
  ref2.putClass( idcontentLayer );
  desc12.putReference( idnull, ref2 );
  var idUsng = charIDToTypeID( "Usng" );
  var desc13 = new ActionDescriptor();
  var idType = charIDToTypeID( "Type" );
  var desc14 = new ActionDescriptor();
  var idClr = charIDToTypeID( "Clr " );
  var desc15 = new ActionDescriptor();
  var idRd = charIDToTypeID( "Rd  " );
  desc15.putDouble( idRd, 0.000000 );
  var idGrn = charIDToTypeID( "Grn " );
  desc15.putDouble( idGrn, 0.000000 );
  var idBl = charIDToTypeID( "Bl  " );
  desc15.putDouble( idBl, 0.000000 );
  var idRGBC = charIDToTypeID( "RGBC" );
  desc14.putObject( idClr, idRGBC, desc15 );
  var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
  desc13.putObject( idType, idsolidColorLayer, desc14 );
  var idcontentLayer = stringIDToTypeID( "contentLayer" );
  desc12.putObject( idUsng, idcontentLayer, desc13 );
  executeAction( idMk, desc12, DialogModes.NO );
}



// ------------------------------
// Script
// ------------------------------

// Always wrap your script with try/catch blocks so you don't stop production
try {
  configSettings();

  // Get doc and image layer
  var doc = app.activeDocument;
  var image = doc.activeLayer;
  image.name = "image";

  // Convert image to a Smart Object (easier to style and manage layer order this way)
  image = createSmartObject(image);

  // Duplicate the image and color it white
  var mask = image.duplicate(image, ElementPlacement.PLACEAFTER);
  mask.name = "mask";
  doc.activeLayer = mask;
  addColorOverlayToActiveLayer();

  // Resize canvas to fit both images
  var width = doc.width;
  var height = doc.height;
  doc.resizeCanvas(width, height * 2, AnchorPosition.TOPLEFT);
  mask.translate(0, height);

  // Create a black background for the mask
  addBlackFillLayer();
  var black = doc.activeLayer;
  black.name = "black";
  black.move(mask, ElementPlacement.PLACEAFTER);

} catch(e) {

  alert(e);

}

resetSettings();
