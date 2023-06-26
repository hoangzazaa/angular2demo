declare namespace DataTables {
    export interface Settings {
        /*
         * FixedColumns extension options
         */
        fixedColumns?: boolean | FixedColumnsSettings;
    }

    /*
     * FixedColumns extension options
     */
    interface FixedColumnsSettings {
        /*
         * Row height matching algorithm to use
         */
        heightMatch?: 'none' | 'semiauto' | 'auto';

        /*
         * Number of columns to fix to the left of the table
         */
        leftColumns?: number;

        /*
         * Number of columns to fix to the right of the table
         */
        rightColumns?: number;
    }
}
