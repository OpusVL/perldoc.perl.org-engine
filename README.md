# perldoc (engine)

This is the source code and docker build scripts for creating the perldoc.perl.org static website, this repository is only in use for source control please visit https://github.com/OpusVL/perldoc.perl.org for any issues, feature requests or other suggestions

## Modifying the site template

There are 2 major files that can modified to change the structure of the generated html files:

`***default.tt***` - template for the documentation content pages

- navigation automatically generated
- links on the sidebar automatically generated
- content automatically generated
- footer links automatically generated

`***main_index.tt***` main landing pages for releases

- navigation automatically generated
- landing page content links automatically generated
- footer links automatically generated

Once changed, the whole site will require a rebuild.

## Rebuilding the compiled HTML

## Optimising JS assets

If you want to optimise the js libraries, there are a few options:

### Grunt

Using Grunt to compile / optimize Sass, JS and Images

This will install the required dependencies that will allow you to update / optimize / improve and remove code from the website

```bash
npm install // yarn
```

There are a few tasks that have been created by default

- image - optimize and copy images from the root into the outputs folder
- sass - compile, optimize and export code into the outputs folder
- uglify - compile, optimize, transpile and export code into the outputs folder

For development, open up a terminal and navigate to the current project

```bash
grunt watch
```

this will watch all the source folders and recreate/ recompile files as needed

```bash
grunt
```

this command will run all tasks (sass, js, images) and compile the build into the outputs/public folder

### Perl JS optimisation tools

[JS minify](https://metacpan.org/pod/JavaScript::Minifier)
[CSS minify](https://metacpan.org/pod/CSS::Minifier)
