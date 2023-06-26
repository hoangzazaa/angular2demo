package vn.vnext.sefuri.sf.helper;

/**
 * Created by DungTQ on 9/1/2017.
 */

import org.ghost4j.Ghostscript;
import org.ghost4j.GhostscriptException;
import org.ghost4j.display.PageRaster;
import org.ghost4j.display.PageRasterDisplayCallback;
import org.ghost4j.document.Document;
import org.ghost4j.document.DocumentException;
import org.ghost4j.document.PDFDocument;
import org.ghost4j.document.PSDocument;
import org.ghost4j.renderer.AbstractRemoteRenderer;
import org.ghost4j.renderer.RendererException;
import org.ghost4j.util.DiskStore;

import java.io.IOException;
import java.util.List;

public class PDFRenderer extends AbstractRemoteRenderer {

    public static final int OPTION_ANTIALIASING_NONE = 0;
    public static final int OPTION_ANTIALIASING_LOW = 1;
    public static final int OPTION_ANTIALIASING_MEDIUM = 2;
    public static final int OPTION_ANTIALIASING_HIGH = 4;

    /**
     * Define subsample antialiasing level (default is low).
     */
    private int antialiasing = OPTION_ANTIALIASING_LOW;

    /**
     * Define renderer output resolution in DPI (default is 75dpi).
     */
    private int resolution = 75;

    public PDFRenderer() {

        // set supported classes
        supportedDocumentClasses = new Class[2];
        supportedDocumentClasses[0] = PDFDocument.class;
        supportedDocumentClasses[1] = PSDocument.class;
    }

    /**
     * Main method used to start the renderer in standalone 'slave mode'.
     *
     * @param args
     * @throws RendererException
     */
    public static void main(String[] args) throws RendererException {

        startRemoteRenderer(new org.ghost4j.renderer.SimpleRenderer());
    }

    @Override
    public List<PageRaster> run(Document document, int begin, int end)
            throws IOException, RendererException, DocumentException {

        // assert document is supported
        this.assertDocumentSupported(document);

        // get Ghostscript instance
        Ghostscript gs = Ghostscript.getInstance();

        // generate a unique diskstore key for input file
        DiskStore diskStore = DiskStore.getInstance();
        String inputDiskStoreKey = diskStore.generateUniqueKey();
        // write document to input file
        document.write(diskStore.addFile(inputDiskStoreKey));

        // create display callback
        PageRasterDisplayCallback displayCallback = new PageRasterDisplayCallback();

        // prepare args
        String[] gsArgs = {"-dQUIET", "-dNOPAUSE", "-dBATCH", "-dSAFER",
                "-dFirstPage=1", "-dLastPage=1", "-sDEVICE=display",
                "-sDisplayHandle=0", "-dDisplayFormat=16#804",
                "-r72", "-dTextAlphaBits=4", "-dGraphicsAlphaBits=4", "-f",
                diskStore.getFile(inputDiskStoreKey).getAbsolutePath(),
                "-dGridFitTT=2", "-dPDFFitPage -g300x300", "-dJPEGQ=80",
                "-dDEVICEWIDTHPOINTS=300", "-dDEVICEHEIGHTPOINTS=300"};


        // execute and exit interpreter
        try {
            synchronized (gs) {

                // set display callback
                gs.setDisplayCallback(displayCallback);

                gs.initialize(gsArgs);
                gs.exit();

            }
        } catch (GhostscriptException e) {

            throw new RendererException(e);

        } finally {

            // delete Ghostscript instance
            try {
                Ghostscript.deleteInstance();
            } catch (GhostscriptException e) {
                throw new RendererException(e);
            }

            // remove temporary file
            diskStore.removeFile(inputDiskStoreKey);
        }

        return displayCallback.getRasters();

    }

    public int getAntialiasing() {
        return antialiasing;
    }

    public void setAntialiasing(int antialiasing) {
        this.antialiasing = antialiasing;
    }

    public int getResolution() {
        return resolution;
    }

    public void setResolution(int resolution) {
        this.resolution = resolution;
    }
}

