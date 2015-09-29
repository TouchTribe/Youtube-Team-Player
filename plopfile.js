module.exports = function (plop) {
    plop.setGenerator('component', {
        description: 'Generate a new component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Name?',
            validate: function (value) {
                if ((/.+/).test(value)) { return true; }
                return 'name is required';
            }
        }],
        actions: [{
            type: 'add',
            path: 'app/src/components/{{lowerCase name}}/{{lowerCase name}}.jsx',
            templateFile: 'templates/component.template'
        }]
    });
};
