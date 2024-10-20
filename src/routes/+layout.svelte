<script lang="ts">
    import { storeHighlightJs } from '@skeletonlabs/skeleton';
    import hljs from 'highlight.js/lib/core';
    import { Toaster } from 'svelte-french-toast';

    import '../app.css';

    // Import required language modules
    import css from 'highlight.js/lib/languages/css';
    import javascript from 'highlight.js/lib/languages/javascript';
    import json from 'highlight.js/lib/languages/json';
    import shell from 'highlight.js/lib/languages/shell';
    import typescript from 'highlight.js/lib/languages/typescript';
    import xml from 'highlight.js/lib/languages/xml';

    // Register languages with highlight.js
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('shell', shell);

    storeHighlightJs.set(hljs);
</script>

<Toaster />


<slot />
