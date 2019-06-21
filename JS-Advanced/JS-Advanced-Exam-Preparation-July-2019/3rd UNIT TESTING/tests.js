let assert = require("chai").assert;
let SoftUniFy = require('./03. Softunify_Ресурси');

describe('ctor should work properly',function(){
    it('ctor should work properly',function(){
        let current = new SoftUniFy();
        assert.equal(undefined,current.length);
    });
});

describe('downloadSong method should work properly',function(){
    it('Should return song',function(){
        let current = new SoftUniFy();
        current.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        assert.equal('Venom - Knock, Knock let the devil in...',current.songsList);
    });

    it('Should return empty song list',function(){
        let current = new SoftUniFy();
        assert.equal('Your song list is empty',current.songsList);
    });

    it('Should return songs',function(){
        let current = new SoftUniFy();
        current.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        current.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
        assert.equal('Venom - Knock, Knock let the devil in...\nPhenomenal - IM PHENOMENAL...',current.songsList);
    });
});

describe('playSong method should work properly',function(){
    it('Should return already downloaded songs from 1 author',function(){
        let current = new SoftUniFy();
        current.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        current.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
        assert.equal('Eminem:\nVenom - Knock, Knock let the devil in...\n',current.playSong('Venom'));
    });

    it('Should return not found song message',function(){
        let current = new SoftUniFy();
        assert.equal(`You have not downloaded a zdr song yet. Use SoftUniFy's function downloadSong() to change that!`,current.playSong('zdr'));
    });

    it('Should return already downloaded songs from 2 authors',function(){
        let current = new SoftUniFy();
        current.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        current.downloadSong('Atanas', 'Venom', 'IM PHENOMENAL...');
        assert.equal('Eminem:\nVenom - Knock, Knock let the devil in...\nAtanas:\nVenom - IM PHENOMENAL...\n',current.playSong('Venom'));
    });
});

describe('rateArtist should work properly',function(){
    it('Should return not in your list message',function(){
        let current = new SoftUniFy();

        assert.equal('The Eminem is not on your artist list.',current.rateArtist('Eminem'))
    });

    it('Should return not in your list message',function(){
        let current = new SoftUniFy();

        assert.equal('The Eminem is not on your artist list.',current.rateArtist('Eminem',50))
    });

    it('Should return proper average rate',function(){
        let current = new SoftUniFy();
        current.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        assert.equal(40,current.rateArtist('Eminem',40)); //rate
    });

    it('Should return proper votes and rate',function(){
        let current = new SoftUniFy();
        current.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        assert.equal(40,current.rateArtist('Eminem',40)); //rate
        assert.equal('{"Eminem":{"rate":40,"votes":1,"songs":["Venom - Knock, Knock let the devil in..."]}}',JSON.stringify(current.allSongs)); //rate
    });
});

describe('getSongList should work properly',function(){
    it('Should return song',function(){
        let current = new SoftUniFy();
        current.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
        assert.equal('Venom - Knock, Knock let the devil in...',current.songsList);
    });
});
