var peakDom = (function () {
    'use strict';

    var holder = function (selector) {
        this.elems = document.querySelectorAll(selector);
    };

    holder.prototype.each = function (callback) {
        if (!callback || typeof callback !== 'function') return;
        for (var i = 0; i < this.elems.length; i++) {
            callback(this.elems[i], i);
        }
        return this;
    };

    holder.prototype.validate =function ( errorArea =0) {
        this.each(function (form) {
            let formChilds = form.childNodes;
            for (let i = 0 ; i<formChilds.length; i++){
                if (formChilds[i].tagName === 'INPUT' && formChilds[i].hasAttribute('pd-validate')){
                   formChilds[i].onkeyup= function () {
                       let rule= formChilds[i].getAttribute('pd-validate').split("|");
                       rule = RuleHandler.parse(rule);
                       Error.handle(rule,formChilds[i],errorArea);
                   }
                }
            }
        });
    };

    let Error = {
        handle: function (rule,input,errorArea) {

            /*
            *  on-error and on-accept
            * */

            if('on-error' in rule) var colorReject =rule['on-error'] ;
            else colorReject ='red';

            if('on-accept' in rule) var colorAccept =rule['on-accept'] ;
            else colorReject ='green';



            if ('numbers' in rule){
                let numberPattren= /^[0-9]+$/;
                if (!numberPattren.test(input.value)) {
                    input.classList.add('error-number');
                    this.show(errorArea,'Numbers only');
                }else{
                    input.classList.remove('error-number')
                }
            }

            if ('min' in rule){
               if (input.value.length < rule['min']) {
                   input.classList.add('error-min');
                   this.show(errorArea,'<p>Erorr</p>');
               }else{
                   input.classList.remove('error-min')
               }

            }

            if ('max' in rule){
                if (input.value.length > rule['max']) {
                    input.classList.add('error-max');
                    this.show(errorArea,'Max number');
                }else{
                    input.classList.remove('error-max')
                }

            }

            if ('email' in rule){
                let emailPattren= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!emailPattren.test(input.value)) {
                    input.classList.add('error-email');
                    this.show(errorArea,'Not email');
                }else{
                    input.classList.remove('error-email')
                }

            }
        },

        show: function (errorArea,error) {
            if(errorArea){
                let para = document.createElement("P");
                let t = document.createTextNode(error);
                para.appendChild(t);                                        
                document.querySelectorAll(errorArea)[0].appendChild(para);
            }

        },



    };
    let RuleHandler = {
        parse : function (rule) {
            let newRule ={};
            for (let i=0;i<rule.length;i++){
                if(rule[i].search('numbers') > -1) newRule['numbers']='numerical';
                if (rule[i].search('password') > -1) newRule['password']='password';
                if (rule[i].search('email') > -1) newRule['email']='email';

                if(rule[i].search('max') > -1) {
                    let startIndex = rule[i].search('max');
                    newRule['max']=parseInt(rule[i].slice(startIndex+4,rule[i].length));
                }
                if(rule[i].search('min') > -1){
                    let startIndex = rule[i].search('min');
                    newRule['min']=parseInt(rule[i].slice(startIndex+4,rule[i].length));
                }
                if(rule[i].search('on-error') > -1){
                    let startIndex = rule[i].search('on-error');
                    newRule['on-error']=rule[i].slice(startIndex+9,rule[i].length);
                }
                if(rule[i].search('on-accept') > -1){
                    let startIndex = rule[i].search('on-accept');
                    newRule['on-accept']=rule[i].slice(startIndex+10,rule[i].length);
                }
            }
            return newRule;
        }
    };


    var data = function (selector) {
        return new holder(selector);
    };

    return data;

})();






peakDom('#myForm').validate('#errorArea');


