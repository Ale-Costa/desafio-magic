# Considerações

## Realizei algumas alterações não previstas, segue mais detalhes:

1.  Tive um problema com alguns sets onde ao buscar as coleções retornava erro. Reparei que o erro ocorria quando o code do set havia 4 dígitos ou algum número, li a documentação e não encontrei nada referente a isso e tambem pode ter sido algum erro meu que não consegui identificar. Como a api não esta retornando outro identificador alem do code, decidi fazer uma filtragem e só listar os sets que estão funcionando corretamente.

2.  Além da filtragem por type Creature, adicionei uma filtragem por colorIdentity, alguns cards estavam vindo sem essa informação, para melhorar a visualização do desafio desconsiderei os cards que não possuem esse atributo.

# Desafio Magic: The Gathering

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
