




## Scene Object

**Types:**
- HotspotMarker
- ImageMarker

 
**Optional parameters:**
- `userData` - could be used to store custom data such as record object associated to the marker
- `UIConfig` - could be used to configure UI flow initialized by .click() event

## Scene Marker Objects
```javascript
//Create HotspotMarker
new HotspotMarker({
        userData: {_id:123, sku:555},
        UIConfig:{
            Component:HotspotForm,
            positionNextToTheElement:true,
            style:{background:'none'}
        }
    });
```



### .click()
```javascript
//Open UI Form
marker.click();
```