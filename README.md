# laravel-like-validation
Easy laravel-like form validation in two words  , form.validate() !

# Basic Example
in your HTML document probably you have something like this :

```html
<form action="somelink" id="myForm">
        <input type="text" placeholder="username">
        <input type="password" placeholder="password">
        <button type="submit">Log in</button>
</form>
```

if we want to validate this form , we have to spicfy some rules in a (pd-validate) attribute :

```html
<form action="somelink" id="myForm">
        <input type="text" placeholder="username" pd-validate="on-error:red|on-accept:green|max:10|numbers|max:10|min:3">
        <input type="password" placeholder="password" pd-validate="on-error:red|on-accept:green|max:10|numbers|max:10|min:3">
        <button type="submit">Log in</button>
</form>
```

then in out Javascript file we will call out superdoper validator :

```
dd('#myForm').validate();
```

now DomDon will handle any inputs fileds inside the form and validate it when user try to edit its values . 


# How to use  ?
its very simple to setup DomDon laravel like validator , in your html just add a ```<script>``` tag that indicates DomDon Js file

```html
<script src="domDon.js"></script>
```

then you have to run the validator by :

```
dd('#myForm').validate();  // you can add form ID or Class name
```

also you can show errors detiles by adding container 
```
dd('#myForm').validate('#cont');  
```


# Rules :

```numbers ``` only numbers in the input 
```max``` max length allowed 
```min``` max length allowed 
```email``` only email allowed
```on-error``` defulet validator color behavior on rejected inputs , accept any color .
```on-accept``` defulet validator color behavior on accepted inputs , accept any color .


# Customization :
some classes added automatically to the inputs , you can use them to style the errors

no