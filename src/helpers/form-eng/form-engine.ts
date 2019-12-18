const pug = require('pug');

const FieldTypes = [
    {
        type: 'string',
        params: [
            ''
        ]
    },
    {
        type: 'common',
        params: [
            'visible',
            'editable'
        ]
    }
];

// Logic
class Field {
    type: string;
    name: string;
    label: string;
    value?: string|number;
    load:()=>Promise<any>;
    upload:()=>Promise<any>;

    constructor(type: string, name: string, label: string, attr: object, getter:any, setter:any) {
        this.type = type;
        this.name = name;
        this.label = label;
        this.load = function () {
            return getter().then((val: any) => this.value = val)
        };
        this.upload = function () {
            return setter(this.value)
        }
    }
}
module.exports.Field = Field;

class Form {
    constructor(public fields: Field[]) {}

    load() {
        let intents = this.fields.map(f => f.load());
        return Promise.all(intents);
    }
    upload() {
        let intents = this.fields.map(f => f.upload());
        return Promise.all(intents);
    }
}
module.exports.Form = Form;

// Rendering

interface PugField {
    type: string;
    name: string;
    label: string;
    disabled?:boolean;
    value?:string|number;
    attr?:object;
}
interface PugFormMeta {
    title?: string;
    name?: string;
    action: string;
    method: string;
    attr?: object;
}
interface PugForm extends PugFormMeta{
    fields: PugField[];
}

function toPug(form:Form, meta:PugFormMeta): PugForm {
    let pugform = (meta as PugForm);
    pugform.fields = form.fields.map((f)=> f as PugField);
    return pugform;
}
module.exports.toPug = toPug;

const compiler: ((arg:PugForm)=>string) = pug.compileFile('form');
module.exports.compiler = compiler;