// regexWorker.js
self.onmessage = function(e) {
    const { regexValue, text } = e.data;
    try {
        const moteur = new RegExp(regexValue);
        const resultat = moteur.test(text);
        self.postMessage({ ok: true, resultat });
    } catch (err) {
        self.postMessage({ ok: false, erreur: err.message });
    }
};