# i5-white-label
A plugin for Informer 5 that replaces various visual aspects of Informer


## To replace Logo and Favicon
1. Put the main logo and banner logo (for login page) into public/images
2. Put custom login page in assets/login.html
3. To customize the favicon, use https://realfavicongenerator.net/ and put it in public/images/favicon folder

## To override various text and translations within the core Informer application
Clients wanting to override (partially or wholly) any part of the core or plugin-added namespaces,
or even want to introduce entirely new languages for their ENTIRE DEPLOYMENT can do so one of two ways:
    
1. For native environments, define a custom 'localesDir' in config.json under i18n:
   <pre>
        {
            "i18n": {
                "localesDir": "absolute/path/to/dir"
            }
        }
   </pre>
        
2. In a Docker environment, a volume mount point exists at '/informer/locales/custom' which should contain the expected locale directory structure:
   <br>
        <pre>/informer/locales/custom:
            /en/common.json         <-- overrides in core en/common.json (can be partial)
            /en/plugin-ns.json      <-- overrides for a namespace added by a plugin
            /new-LANG/ns1.json      <-- adding an entirely new language/locale!
            /new-LANG/ns2.json
            /new-LANG/plugin-ns.json    <-- adding plugin namespace to the new language
            ...</pre>

When the deployment-wide directory exists and is non-empty, the translations in the configured 'custom' directory will be
loaded LAST after all core & plugin-based locales and namespaces are registered and loaded. This will allow the
deployment configuration to have final say and have the opportunity to also override the i18n of any plugins,
which is necessary for a more complete re-branding.

Because of this override functionality, to best avoid unintentional namespace collisions we suggest that plugins either:

- (*preferred*) prefix their proprietary translation namespaces uniquely according to their plugin id or something
- use their plugin id as a single, central namespace
- namespace by specific file/directive/service/etc.

The registered custom translation directory for a plugin or deployment must adhere to the same directory structure as the
main /locales or /language-pack directory:
    <pre>/\<pluginTranslationFileDir>/\<langCode>/\<namespace>.json</pre>
    
As an example, a 'locales' folder has been added to this plugin.  Within that folder is a 'custom' dir, followed by an 'en'
dir, which contains the following files:
1.  common.json:  These entries will overwrite Entrinsik/Informer specific labels, so that there is no mention of another
company within the Informer instance.
2.  admin.json:  These entries will overwrite the related substates under the Administration -> Settings page within Informer.

To see this work, either update your config.json within your Informer installation as mentioned in item 1 above to point to this folder
path, or copy this folder to the '/informer/' volume mount point as mentioned in item 2 above.

## To add completely new text and translations to external plugins and modules
- Plugins & Modules with their own translation JSON files can register the absolute path to the parent directory
containing the language directories & namespace files
<pre>
server.driver('translation', {
    id: 'my-plugin',
    localesDir: path.resolve(__dirname, './myI18nDir')
});
</pre>
