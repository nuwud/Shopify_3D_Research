[https://help.shopify.com/en/partners/resources/creating-media/3d-models/creating-3d-models/3d-modeling-checklist](https://help.shopify.com/en/partners/resources/creating-media/3d-models/creating-3d-models/3d-modeling-checklist)

Search or ask a question  
Contents  
[Home](https://help.shopify.com/en/partners)  
...  
[Working with media](https://help.shopify.com/en/partners/resources/creating-media)  
[3D models](https://help.shopify.com/en/partners/resources/creating-media/3d-models)  
[Creating 3D models](https://help.shopify.com/en/partners/resources/creating-media/3d-models/creating-3d-models)

# **3D modeling checklist for Shopify Partners**

Use this checklist to make sure that a 3D model is ready to be delivered to a merchant. For more information on proper modeling technique, refer to [*Creating 3D models for merchants*](https://help.shopify.com/partners/resources/creating-media/3d-models/creating-3d-models).

If a merchant asks where they can inspect the 3D model, then tell them to use [model-viewer](https://modelviewer.dev/editor) by dragging and dropping the GLB file onto the web page. For USDZ files, have them open the file on an iOS or MacOS device.

## **On this page**

* [Mandatory requirements](https://help.shopify.com/en/partners/resources/creating-media/3d-models/creating-3d-models/3d-modeling-checklist#mandatory-requirements)  
* [Best practices](https://help.shopify.com/en/partners/resources/creating-media/3d-models/creating-3d-models/3d-modeling-checklist#best-practices)

## **Mandatory requirements**

The following points are required of all 3D models made for Shopify merchants.

### **Technical requirements**

 A GLB or USDZ file that contains the following has been sent to the merchant:

* Model geometry  
* 1 base color texture  
* 1 normal map texture  
* 1 texture with ambient occlusion, roughness, and metalness mapped to the RBG channels respectively  
* 1 emissive map (if applicable)

 All textures have been converted to JPG format, if possible.

 A file size below 500 MB. Models over 15 MB are automatically optimized to reduce their file size. Models under 15 MB will not be automatically optimized. In general, model file size should be less than 15 MB. 3D models are typically about 4 MB.

### **Visual accuracy**

 The model is a good representation of the product.

### **Mesh quality**

 There are no inverted or overlapping polygons.

 There is only as much geometry as is necessary. The 3D model should have only enough polygons to ensure accuracy and a smooth silhouette. It should not look geometric.

### **Physically-based rendering (PBR)**

 A PBR workflow is used.

### **Material quality**

 The materials assigned to the geometry match the product reference.

 Only one material is assigned to the model when it's exported from the 3D software.

 All 3D models have baked shadows in their ambient occlusion maps. Additional shadows are an easy way to increase the realism of a model and should always be included.

### **Modeling for revisions**

 The modeler has maintained a good working file. The merchant is likely to want some changes to be made to the 3D model before the work is complete. Maintain an organized working file with high resolution textures in the event a change needs to be made to the 3D model.

### **Real-world scale**

 The model uses a real-world scale. The 3D model should be the same size as the real product when compared in AR.

 The model's scale is measured in meters. To make sure that the model matches the real product, the model's scale for all linear measurements should be in meters as specified in the glTF standard. Check GLB or USDZ export settings if a unit other than meters was used as the base during modelling.

### **UV layout**

 All of the model's UV shells are mapped onto a single texture map.

 The texture map is positioned in the 1:1 space.

 There are no overlapping UV shells.

 The UV seams have been placed on natural boundaries.

 The UV shells have been manually unwrapped by using proper unwrapping techniques. Automatic unwrapping tools should not be used because you will get unoptimized results.

### **Product origin**

 The point where the model rotates is centered at the product's base.

### **Exporting practices**

 All objects have been combined into one object.

 All edges have been softened.

 The base of the model has been placed at the origin of the grid.

 All transformations have been frozen.

 All history has been deleted.

## **Best practices**

When modeling, keep in mind the following best practices. They might vary in relevance from model to model, but they should be followed most of the time.

 Textures are JPG files when possible. If the textures are not JPG, then you can open them in Photoshop and save them as 2048 x 2048 px JPGs at 60% by using the Save for Web Legacy option. When the 3D model has some transparency, the base color texture should be a PNG file.

 The GLB file size is optimized. The file size of a 3D model should be relative to the complexity of the object that the model is representing. Typically, a GLB/USDZ file should be 4 MB or less.

 Individual pieces are modeled separately and then combined as if they were part of a real product.

 Edges are properly beveled. Bevel all edges to ensure a smooth transition between faces.

 Textures are 2K (2048 x 2048 px) or less. Textures are often the cause of large file sizes, which can slow down a merchant's store. Optimize textures before sending a 3D model to a merchant.

 Textures aren't blurry or pixelated. If a certain piece of the 3D model is blurry or pixelated, then it requires more space on the UV map. Make sure that high-detail pieces, such as zippers and logos, are clear and easy to see.

 Detailed pieces are larger on the UV map than smooth, featureless pieces. This ensures that the more detailed pieces have more resolution than simpler pieces.

Leave feedback  
Can’t find the answers you’re looking for? W  
