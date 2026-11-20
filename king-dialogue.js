(() => {
    const success = [
        'Pas mal là-bas, on dirait que tu as de la matière grise !',
        'Donc comme ça, tu en as dans le cerveau, hnnnn…',
        'Je pense que celui-ci est difficile à vaincre. PARESSE ? Prépare les météores pour le prochain tour.',
        'Tu résistes, tu résistes… mais jusqu’où, petit branleur ?',
        'La flemme ? Tes météores ne font pas de dégâts sur ce cerveau. Il est coriace, le morveux.',
        'J’ai demandé à SOMMEIL de t’endormir, mais toi, tu es encore éveillé(e).',
        'Et dire que je pensais avoir fermé les bibliothèques… Où as-tu lu, trou du cul ?',
        'Pas mal, champion. Tu as plus de neurones que ton air ne le laisse croire.',
        'Un tour de plus et tu vas finir par me faire respecter les gens travailleurs.',
        'Hé, le cerveau est en marche ! Qui lui a donné l’autorisation ?',
        'Tu viens de survivre. Ne prends pas la grosse tête, elle est déjà assez lourde.',
        'Joli tir, morveux. Même mes météores ont demandé une pause.',
        'Tu réfléchis vite pour quelqu’un qui a l’air de chercher le bouton marche.',
        'Pas dégueu. Je retire une insulte… juste une, faut pas rêver.',
        'Tu as de la ressource. C’est embêtant pour mon plan de sieste.',
        'Bon, bon… tu tiens debout. Mes météores vont devoir bosser davantage.',
        'Ça cogite là-dedans ! Je vais prévenir mes météores de rester prudents.',
        'Tu m’impressionnes presque. Le « presque » est important, petit malin.',
        'Encore un tour ? Tu es tenace comme un moustique dans ma chambre.',
        'Joli boulot ! Pour un adversaire qui n’a même pas de barbe, tu te défends.',
        'Tu as passé ce tour. Ma sieste est officiellement reportée, quelle injustice.',
        'Je l’avoue : ton cerveau n’est pas juste là pour faire joli.',
        'Tes réponses sont solides. Tes cheveux, eux, ont l’air moins sûrs.',
        'Ça devient sérieux. Je vais devoir réveiller mes météores les plus pénibles.',
        'Pas mal du tout. Ne souris pas trop, je prépare déjà la suite.',
        'Tu as esquivé mes météores et mes prédictions. C’est agaçant, mais classe.',
        'Le morveux a du répondant ! Mes météores vont finir par déposer une plainte.',
        'Tu tiens bon. J’espère que tu as gardé un peu de cerveau pour le prochain tour.',
        'Je voulais te voir échouer, mais je dois reconnaître que c’était bien joué.',
        'Encore debout ? Très bien. Le Roi Paresse va devoir se salir les mains.'
    ];

    const failure = [
        'Tu pensais que tu valais quelque chose, ENFOIRÉ ? MDR.',
        'Je ne me suis même pas échauffé, hnnn… t’es trop NUL !',
        'Non mais trois, quatre, cinq météores et c’est fini ? HAHAHA !',
        'Va lire avant de revenir, ce n’est pas pour les nazes ici. RRRrrr.',
        'Ducon, tu pensais pouvoir challenger le ROI PARESSE ? MDR.',
        'Aïe, ton cerveau vient de demander un arrêt maladie.',
        'Tes réponses ont pris la fuite avant toi. Quelle équipe de bras cassés !',
        'Base détruite ! Même ma grand-mère en armure aurait tenu plus longtemps.',
        'Tu as visé les réponses au hasard ou tes neurones ont quitté la partie ?',
        'Cinq météores et déjà par terre ? Je retourne faire la sieste, c’était trop facile.',
        'Je t’avais pourtant envoyé des météores au ralenti. Tu fais exprès, morveux ?',
        'Ouvre un livre, bois de l’eau, puis reviens avec un cerveau chargé.',
        'Le Roi Paresse gagne encore. Quelle surprise absolument pas surprenante.',
        'Tu t’es défendu comme une chaussette mouillée. Une chaussette très courageuse, mais quand même.',
        'Même mes météores ont trouvé ça rapide. Ils n’ont pas eu le temps de s’amuser !',
        'Tu as confondu défense de base et sieste collective, champion ?',
        'Oh non… ton dernier neurone vient de poser sa démission.',
        'Tu voulais jouer au héros ? La cape est au sol avec le reste de ta base.',
        'C’était une partie ou une démonstration de comment perdre en accéléré ?',
        'Tu as combattu avec panache. Avec précision, beaucoup moins.',
        'Mes météores te remercient pour cet entraînement facile.',
        'La prochaine fois, essaie de lire la question avant d’appuyer, tête de pioche.',
        'Ton cerveau est peut-être intelligent, mais il était clairement en pause.',
        'Base détruite, ego froissé, météores contents. Belle journée, non ?',
        'Tu as offert la victoire au Roi Paresse sur un plateau. Avec une petite serviette aussi ?',
        'J’ai vu des escargots défendre leur salade avec plus de conviction.',
        'Tu t’es fait battre par des cailloux qui tombent. Réfléchis deux secondes, bon sang !',
        'La flemme a gagné cette manche. Elle t’envoie ses salutations, pauvre naze.',
        'Quelle dégringolade ! Même ton combo a préféré ne pas être associé à ça.',
        'Allez, relève-toi. Le Roi Paresse n’a pas fini de se moquer de toi.'
    ];

    const previous = { success: -1, failure: -1 };
    function pick(type) {
        const key = type === 'success' ? 'success' : 'failure';
        const bank = key === 'success' ? success : failure;
        let index = Math.floor(Math.random() * bank.length);
        if (bank.length > 1 && index === previous[key]) index = (index + 1 + Math.floor(Math.random() * (bank.length - 1))) % bank.length;
        previous[key] = index;
        return bank[index];
    }

    window.KingDialogue = {
        pick,
        counts: { success: success.length, failure: failure.length }
    };
})();
