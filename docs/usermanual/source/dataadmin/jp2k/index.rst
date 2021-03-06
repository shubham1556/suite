.. _dataadmin.jp2k:

Working with JPEG 2000 (JP2K) data
==================================

Boundless Suite supports data saved in `JPEG 2000 <https://jpeg.org/jpeg2000/index.html>`_ format. This image format utilizes wavelet compression for more efficient storage.

This data can be loaded and published through GeoServer.

Installing JPEG 2000 support
-----------------------------

JPEG 2000 support isn't enabled by default, so it must be separately installed through an extension.

.. include:: ../include/ext_install_links.txt

Verifying installation
----------------------

.. include:: ../../install/include/ext/jp2k_verify.txt

For more information on adding a store and publishing layers, please see the :geoserver:`GeoServer documentation for JPEG 2000 <extensions/jp2k/>`.

Caveats
-------

JPEG 2000 support is also available through the :ref:`GDAL formats extension <dataadmin.gdal>`. Having both the JPEG 2000 ("Direct") extension installed and GDAL JPEG 2000 support installed at the same time creates an issue with the REST importer, which is unable to determine which store to use. This is only an issue with REST; stores can be created without problem through the GeoServer UI.

.. Add tutorials here