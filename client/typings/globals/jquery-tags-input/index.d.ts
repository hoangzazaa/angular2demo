/**
 * Created by VuPT on 11/18/2016.
 */
interface JQuery {
    /* tslint:enable: interface-name */
    tagsInput:(options:JqueryTagsInputOption) => void;
    importTags:(tags:string) => void;
}

interface JqueryTagsInputOption {
    'autocomplete_url'?:string;
    //'autocomplete'?: { option: value, option: value},
    'height'?:string;
    'width'?:string;
    'minInputWidth'?:string;
    'interactive'?:boolean;
    'defaultText'?:string;
    'onPreAddTag'?:(tag) => boolean;
    'onAddTag'?:(tag) => void;
    'onRemoveTag'?:(tag) => void;
    'onChange'?:(elem, elem_tags) => void;
    'delimiter'?:string[];
    'removeWithBackspace'?:boolean;
    'minChars'?:number;
    'maxChars'?:number;
    'placeholderColor'?:string;
}
