.. _install.windows.tomcat.geoserver.performance:

GeoServer Performance
=====================

The following extensions make changes to the GeoServer execution environment unlocking new capabilities and performance.

These extensions are strongly recommended.

Java Cryptography Extension
---------------------------

We recommend installing the Java Cryptography Extension Unlimited Strength Jurisdiction Policy File files.

1. Download the :guilabel:`Java Cryptography Extension Unlimited Strength Jurisdiction Policy Files` listed under :guilabel:`Additional Resources` on the `download page <http://www.oracle.com/technetwork/java/javase/downloads/index.html>`__ .
   
   .. figure:: ../img/java_cryptography.png
      :scale: 75%
      
      Java Cryptography Extension (JCE) Policy Files
   
2. Unzip the two jar files :file:`local_policy.jar` and :file:`US_export_policy.jar` file into your ``JRE_HOME`` :file:`lib` directory.  For Java 1.8.0 the file:`lib\\security` directory is located in :file:`C:\\Program Files (x86)\\Java\\jre1.8.0_101\\lib\\security`.
   
   These files will overwrite the existing policy files.
   
   .. figure:: ../img/java_cryptography_install.png
      :scale: 50%
      
      Installation of local_policy.jar and US_export_policy.jar
  
  .. note:: You may find it easier to cut-and-paste the two files into the correct folder.

3. Once GeoServer is installed, logging into the web application will list ``"Strong cryptography available``.

Marlin Rasterizer Extension
---------------------------

We recommend making use of the Marlin Rasterizer for improved WMS performance:

1. From the :file:`BoundlessSuite-ext` download open the :file:`marlin` folder.
2. Copy the :file:`marlin-0.7.3-Unsafe.jar` to your Tomcat :file:`bin` folder. The file will be located in:
   
   * :file:`C:\\Program Files (x86)\\Apache Software Foundation\\Tomcat 8\\bin\\marlin-0.7.3-Unsafe.jar`
   
   .. figure:: ../img/marlin_install.png
      :scale: 50%
      
      Marlin Install
      
3. Return to :guilabel:`Apache Tomcat Properties`, the :guilabel:`Java` tab, to add the following additional :guilabel:`Java Options`:
   
   .. warning:: Please adjust the example below to match your version of tomcat (example Tomcat 8.5)
   
   .. literalinclude:: ../include/java_opts.txt
      :language: bash
      :start-after: # marlin
      :end-before: # marlin end
  
  Press :guilabel:`Apply`.
  
4. Once GeoServer is installed visit the :guilabel:`Server Status` page to confirm the use of the Marlin Rasterizer. The :guilabel:`Java Rendering Engine` will be listed as ``org.marlin.pisces.PiscesRenderingEngine``.

   .. figure:: ../img/geoserver_marlin.png
      
      Server Status Marlin rendering Engine