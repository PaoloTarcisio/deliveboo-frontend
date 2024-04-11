import { reactive } from "vue";

export const store =reactive ({
    piatto:[
        {
            nome:"",
            prezzo:"",
        }
    ],
    carrello: []
});