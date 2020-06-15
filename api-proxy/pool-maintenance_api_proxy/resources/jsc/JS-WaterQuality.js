var payload= context.getVariable("response.content");
var processedImage = JSON.parse(payload);
var blueWatersScore = processedImage.responses[0].imagePropertiesAnnotation.dominantColors.colors[0].color.blue;
var greenWatersScore = processedImage.responses[0].imagePropertiesAnnotation.dominantColors.colors[0].color.green;
var imageLabels = processedImage.responses[0].labelAnnotations;

var newPayload;

context.setVariable("triggerError", "true");

for (var i = 0; i < imageLabels.length; i++) {
    var imageLabel = imageLabels[i];
    if(isPool(imageLabel)){
        if(blueWatersScore > greenWatersScore) {
            newPayload = '{"analysis":"Quality of water looks good, nel blu dipinto di blu!", "action":"none"}';
        }
    else {
        newPayload = '{"analysis":"Please, contact one of our partner maintenance services using our special discounts. Better safe than sorry.", "contractors":[{"name":"Chemical Pools","discount":"2%"},{"name":"Line Blue","discount":"1.75%"},{"name":"Safe Waters","discount":"2%"}]}';
    }
    
    context.setVariable('response.content', newPayload);
    context.setVariable("triggerError", "false");
    break;
  }
}

function isPool(imageLabel) {
    const POOL= "pool";
    
    if(imageLabel.description.toUpperCase().includes(POOL.toUpperCase())) {
        return true;
    }
    
    return false;
}
