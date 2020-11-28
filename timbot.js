console.log(`Loading...`);

//Calling packages
const Discord = require('discord.js');
const { token } = require('./config.json');
//const token = 'NzYwMjU5MTcwNzk2MTc1NDEx.X3Jchw.E00hUd2k2V0ntXejTFuux-s3yz0'; //TimBeta
const eco = require("discord-economy");
const lvl = require("discord-leveling"); //Halloween Leveling
const msglvl = require("discord-leveling-2");
const snowlvl = require("discord-leveling-3");
const ecolvl = require("discord-leveling-4");
const candy2020 = require("discord-leveling-5");
const MarkovGen = require("markov-generator");
const Scrambo = require("scrambo");
const cube = new Scrambo();
const client = new Discord.Client();
const modRole = 'Bot Admin';
const bankRole = 'Loan Shark';
const banRole = 'useless bitch';
const triggeredCandyRecently = new Set();
var jackpotCounter = 100;
const sql = require('sqlite');
sql.open('Storage/userData.sqlite');

//Initialization
client.on('ready', () => {
    console.log('TimBot v1.9.0 Launched');

    client.user.setActivity("with Sunny :)", { type: "PLAYING" });
})

//Starboard
client.on('messageReactionAdd', async (reaction, user) => {
    var message = reaction.message;
    var emoji = reaction.emoji;

    if (emoji.id != '612075877257314367') return;
    //if (message.author.bot) return message.channel.send(`You can't star a bot message, you dunce`);
    const starChannel = message.guild.channels.find(channel => channel.name == 'quote-archive');
    if (!starChannel) return console.log('No starboard channel found');
    const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
    var stars = false;
    if (fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('<:quote:612075877257314367>') && m.embeds[0].footer.text.endsWith(message.id))) stars = true;
    //const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('<:quote:612075877257314367>') && m.embeds[0].footer.text.endsWith(message.id));
    if (stars) {
      const star = /^\<:quote:612075877257314367>\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
      const foundStar = stars.embeds[0];

      var attachment = message.attachments.array()[0].url;
      const imageLink = attachment.split('.');
      const typeOfImage = imageLink[imageLink.length - 1];
      var image = '';
      var image2 = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
      if (image2) image = attachment;

      const embed = new RichEmbed()
        .setColor(foundStar.color)
        .setDescription(foundStar.description)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter(`<:quote:612075877257314367> ${parseInt(star[1])+1} | ${message.id}`)
        .setImage(image);
      const starMsg = await starChannel.fetchMessage(stars.id);
      await starMsg.edit({ embed });
    }
    if (!stars) {
      var attachment = message.attachments.array()[0].url;
      const imageLink = attachment.split('.');
      const typeOfImage = imageLink[imageLink.length - 1];
      var image = '';
      var image2 = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
      if (image2) image = attachment;
      if (image === '' && message.cleanContent.length < 1) return;
      const embed = new RichEmbed()
        .setColor(15844367)
        .setDescription(message.cleanContent)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp(new Date())
        .setFooter(`<:quote:612075877257314367> 1 | ${message.id}`)
        .setImage(image);
      await starChannel.send({ embed });
    }
})

//Listener
client.on('message', async message => {
    //Variables
    var msg = message.content.toUpperCase();
    var prefix = 'T!';
    var prefixAlt = '!';
    var prefix2 = 'S!';
    var sender = message.author;

    if (msg.startsWith(prefixAlt) || msg.startsWith(prefix) || msg.startsWith(prefix2)) {
        if (sender.id == 1) {
            message.channel.send('You are temporarily banned from accessing TimBot.\nYour ban has 1 day(s) remaining.');
            return;
        }
    }

    //Message Leveling
    if (!message.author.bot) {
        await msglvl.AddLevel(sender.id, 1); //Add Message Level
        await msglvl.SetXp(sender.id, 1); //Set xp to default
    }

    var currencyName = `TimCoin`;

    if(msg.startsWith(prefix)) {
        var args = message.content.slice(prefix.length).trim().split(/ +/g); //Creates array with content after prefix
        var command = args.shift().toUpperCase(); //Slices off the first word e.g. 'm!<this part>'
    } else if (msg.startsWith(prefixAlt)) {
        var args = message.content.slice(prefixAlt.length).trim().split(/ +/g); //Creates array with content after prefix
        var command = args.shift().toUpperCase(); //Slices off the first word e.g. 'm!<this part>'
    } else if (msg.startsWith(prefix2)) {
        var args = message.content.slice(prefix2.length).trim().split(/ +/g); //Creates array with content after prefix
        var command = args.shift().toUpperCase(); //Slices off the first word e.g. 'm!<this part>'
    }

    if (args) {
        for (var i = 0; i < args.length; i++) {
            args[i] = args[i].toUpperCase();
        }
    }

    //Halloween Event
    //if (!msg.startsWith(prefix) && !msg.startsWith(prefix2) && !msg.startsWith(prefixAlt) && !message.author.bot && message.channel.type != 'dm') {
        //if (message.channel.id == 612058753293877274 /*Shithead ave */ || message.channel.id == 612061766830260244 /*melee talk*/ || message.channel.id == 612063656036925502 /*newhomies*/ || message.channel.id == 612061198288027796 /*fuck-*/ || message.channel.id == 612063670297427978 /*d1lamb*/ || message.channel.id == 171147807212699648 /*test zone*/ || message.channel.id == 379426403118219266 || message.channel.id == 672221790550097940) {
            /*if (triggeredCandyRecently.has(message.author.id)) {
                //console.log('Currently on cooldown');
                return;
            }
            var r = (Math.random() * 100);
            var oldChannelName = message.channel.name;

            if (r >= 98) { //was 98.5 in 2019
                //console.log('Got inside main event');
                //message.channel.setName('🍬'+oldChannelName);
                //console.log('Should set channel name here to 🍬'+oldChannelName);
                message.channel.setName('🍬'+oldChannelName)

                setTimeout(() => {
                    //console.log('Should change channel name back now');
                    message.channel.setName(oldChannelName);
                }, 16000)
                var timbot = await candy2020.Fetch(608819901943119882);
                var currentJackpot = timbot.xp
                var newJackpot = currentJackpot += 2;
                await candy2020.SetXp(608819901943119882, newJackpot);
                //jackpotCounter++;
                var dogCostumes = [`https://moneydotcomvip.files.wordpress.com/2017/10/171018-dog-halloween-costumes-raptor.jpg`,
                    `https://www.telegraph.co.uk/content/dam/video_previews/r/v/rvmjg1nze6z4vd2gj6owhh9jc6xvdmhk-xxlarge.jpg`,
                    `https://i.pinimg.com/originals/f3/b1/b0/f3b1b045c3e1d50b5d7f4b931165fd15.jpg`,
                    `https://media.phillyvoice.com/media/images/01_102417_HalloweenDogs_Carroll.2e16d0ba.fill-735x490.jpg`,
                    `https://purewows3.imgix.net/images/articles/2019_08/dog_halloween_costumes.jpg`,
                    `https://i.ytimg.com/vi/hdxKJsTvvxQ/hqdefault.jpg`,
                    `https://media1.popsugar-assets.com/files/thumbor/JQUUCOeO9YTIkYrVplfJchnodek/0x0:2003x2003/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/08/28/858/n/24155406/931e6e6c5d66d798a36ba9.34935958_/i/Dogs-Halloween-Costumes.jpg`,
                    `https://diy.sndimg.com/content/dam/images/diy/fullset/2014/6/9/0/CI-Brian-Brainerd_bull-dog-in-ballerina-Halloween-costume_v.jpg.rend.hgtvcom.616.822.suffix/1420778852478.jpeg`,
                    `https://www.simplemost.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-21-at-11.37.56-AM-750x500.png`,
                    `https://static01.nyt.com/images/2014/10/30/t-magazine/30viewfinder-hirsch-slide-TWGN/30viewfinder-hirsch-slide-TWGN-videoLarge.jpg`,
                    `https://dogtime.com/assets/uploads/2018/09/unhappy-dogs-in-costume-2-1280x720.png`,
                    `https://media1.popsugar-assets.com/files/thumbor/hIev4EBak4afdOeJGaGyuzxX-HE/248x0:1454x1206/fit-in/550x550/filters:format_auto-!!-:strip_icc-!!-/2019/09/05/937/n/1922243/4236cd385d717e527c8e79.13418759_/i/Disney-Dog-Costumes.jpg`,
                    `http://trupanion.com/blog/wp-content/uploads/2017/11/edit_IMG_7241.jpg`,
                    `https://www.thepubliceditor.com/wp-content/uploads/2018/09/Dogs_Scary_Halloween_Costume.jpg`,
                    `https://cdn.fashionmagazine.com/wp-content/uploads/2017/10/Screen-Shot-2018-10-30-at-9.58.49-AM-480x320-c-top.png`,
                    `https://i.imgur.com/JO2lNCl.jpg`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-halloween-costumes-1532555670.jpg`,
                    `https://media1.popsugar-assets.com/files/thumbor/CJEtk1U6VpB75o_qxfPAX6579r0/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/10/19/826/n/1922243/a00d1cad_edit_img_image_16686166_1444860712_12142682_526874914145470_1831035987_n/i/DIY-Halloween-Costumes-Dogs.jpg`,
                    `http://www.korrectkritters.com/upload/2017/11/16/fun-dogs-in-halloween-costumes-dogs-in-halloween-costumes-s-90dfed41ee1742bb.jpg`,
                    `https://i.imgur.com/A5nyeDW.png`,
                    `https://i.imgur.com/E3wqRQi.png`,
                    `https://i.imgur.com/hruNkRh.png`,
                    `https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2017/10/halloween-costumes-for-dogs-600x600.jpg`,
                    `https://www.pedigreefoundation.org/wp-content/uploads/2016/10/elvis.jpg`,
                    `https://s.hdnux.com/photos/67/05/73/14442226/3/920x920.jpg`,
                    `https://i.pinimg.com/originals/2e/a0/cd/2ea0cd6333d77d49334fd638d8f1bc28.jpg`,
                    `http://www.dogtagart.com/sites/default/files/blog/dogscostume.jpg`,
                    `https://i.imgur.com/DQJjEMV.jpg`,
                    `https://i.pinimg.com/originals/7e/85/d0/7e85d05973c3b487c9d45c63df55d431.jpg`,
                    `https://moneydotcomvip.files.wordpress.com/2017/10/171018-dog-halloween-costumes-robin.jpg`,
                    `https://s.hdnux.com/photos/04/34/32/1164953/3/920x920.jpg`,
                    `https://i2.wp.com/blog.potterybarn.com/wp-content/uploads/2015/10/Screen-Shot-2015-10-12-at-4.12.06-PM1.png`,
                    `https://i.imgur.com/tn7bfQv.png`,
                    `https://i.imgur.com/ddFxviv.png`,
                    `https://static.businessinsider.com/image/5088501f6bb3f78664000002-750.jpg`,
                    `https://i.ytimg.com/vi/T0OHl7bbL1g/hqdefault.jpg`,
                    `https://hips.hearstapps.com/rbk.h-cdn.co/assets/cm/14/50/548969e457d0e_-_top-paw-basketball-player-costume-for-dogslgn.gif`,
                    `https://static.fabfitfun.com/magazine/wp-content/uploads/2018/10/09170644/dog.png`,
                    `https://i.imgur.com/LzcvHfl.png`,
                    `https://purewows3.imgix.net/images/articles/2017_09/Princess-Leia-dog-costume-for-Halloween.jpg`,
                    `https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2010/7/27/0/Halloween-UGC_Foleyboy-alien-dog-costumes_s4x3.jpg.rend.hgtvcom.616.462.suffix/1400947976466.jpeg`,
                    `https://www.wweek.com/resizer/b5st6q0nx-4BE81x0TdZzJ2198Y=/1200x0/filters:quality(100)/s3.amazonaws.com/arc-wordpress-client-uploads/wweek/wp-content/uploads/2017/10/26171017/Cowboy-Dog.jpg`,
                    `https://media.healthday.com/Images/icimages/dog_costume1026.jpg`,
                    `https://www.telegraph.co.uk/content/dam/Pets/2015-09/30oct/dogcrab.jpg`,
                    `https://purewows3.imgix.net/images/articles/2017_09/Dog-dressed-up-for-Halloween-in-spider-costume.jpg`,
                    `https://petcube.com/blog/content/images/2018/10/dog-pumpkin-halloween-costume.jpg`,
                    `https://i.imgur.com/0UJXND1.jpg`,
                    `https://cdn1-www.cattime.com/assets/uploads/gallery/cool-halloween-costumes/dog-halloween-costume-cerberus.jpg`,
                    `https://costumesjoy.com/wp-content/uploads/2018/08/Dogbaby-Halloween-Costumes-Pet-Clothing-Funny-Guitar-Dog-Clothes-Pet-Puppy-Coats-For-Puppy-Dog-French.jpg`,
                    `https://static-blog.fabfitfun.com/magazine/wp-content/uploads/2018/10/09164347/spider-pup-costume.png`,
                    `https://i.imgur.com/djUHSvl.png`,
                    `https://sitterforyourcritter.com/wp-content/uploads/2017/10/dogs-dressed-as-superheros.jpg`,
                    `https://images-na.ssl-images-amazon.com/images/I/711Qkz8SUcL._AC_SL1500_.jpg`,
                    `https://i.pinimg.com/originals/59/51/3e/59513e4d6d29787eaa2b806284524988.jpg`,
                    `https://s3.amazonaws.com/petcentral.com/wp-content/uploads/2017/10/29122415/dog-halloween-costumes-940x503.jpg`,
                    `https://m.media-amazon.com/images/I/61kk32KKTaL._AC_SS350_.jpg`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758377983786090586/23a5dc97-3222-5ceb-aca5-58d3fb7dc4ba__17463.png`,
                    `https://i.pinimg.com/originals/b6/d7/21/b6d72185e706bd40ba699df8f9740ddd.jpg`,
                    `https://ae01.alicdn.com/kf/HTB1jIQ9SpXXXXXAaFXXq6xXFXXXq.jpg_q50.jpg`,
                    `https://us-east-1.linodeobjects.com/gunaxin/2017/10/skeleton-dog-halloween-costume-non-toxic-pet-paint-5-600x469-560x438.jpg`,
                    `https://bargainbabe.com/wp-content/uploads/2014/09/788c053e4931a6f006a7f773d8f08b90.jpg`,
                    `https://images.halloweencostumes.com/products/15022/1-1/holy-hound-pet-costume.jpg`,
                    `https://arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/TXTUIJAEDFACRHH5WXEWLYMQEE.JPG`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758378714916061194/unknown.png`,
                    `https://images.meredith.com/content/dam/bhg/Images/cg/PetsBatDogImage.jpg.rendition.largest.jpg`,
                    `https://inhabitat.com/wp-content/blogs.dir/1/files/2015/10/at-at-dog-costume-889x741.jpg`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758379018235674624/wheres_waldo_dog_halloween_costume.png`,
                    `https://cdn.shopify.com/s/files/1/0654/0895/products/143390_MAIN._AC_SL1500_V1533931333_2048x2048.jpg`,
                    `https://i5.walmartimages.com/asr/62da8a58-ae33-4c39-9e62-01e0238a1d3f_1.28f9bad19c1a722b39721f0a8484ac3e.jpeg`,
                    `https://i1.wp.com/housefur.com/wp-content/uploads/2020/08/3093054-center-1.jpg`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758379316408483880/unknown.png`,
                    `https://i.etsystatic.com/24436693/r/il/023961/2485791308/il_300x300.2485791308_3h6d.jpg`,
                    `https://s3.amazonaws.com/petcentral.com/wp-content/uploads/2020/07/23135742/dog-halloween-costume-ideas-woody.jpg`,
                    `https://d3d71ba2asa5oz.cloudfront.net/33000550/images/ra4003xl.jpg`,
                    `https://images-na.ssl-images-amazon.com/images/I/61GDI%2BEKlyL._AC_SX522_.jpg`,
                    `https://images-na.ssl-images-amazon.com/images/I/41lgLDbdMgL._AC_.jpg`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758379761365155850/unknown.png`,
                    `https://i1.wp.com/racinecountyeye.com/wp-content/uploads/2017/09/4061956217_f633ac60a3_z.jpg`,
                    `https://i.pinimg.com/originals/3b/5e/fd/3b5efd9a3df348d67fe40126fb3477c1.jpg`,
                    `https://previews.123rf.com/images/iridi/iridi2003/iridi200300081/141670953-the-dog-in-a-funny-hat-is-holding-a-halloween-pumpkin-bucket-with-candies-white-background-isolated-.jpg`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/765207160278745128/yeehaw.jpg`];

                var monkeCostumes = [/*`https://i.pinimg.com/originals/94/83/c4/9483c49fe63907ed3883108f4c953869.jpg`,
                    `https://i.pinimg.com/originals/28/54/59/2854590a890a398fa65a8b72962905f2.jpg`,
                    `https://i.dailymail.co.uk/i/pix/2012/12/10/article-2245683-166F99E3000005DC-243_1024x615_large.jpg`,
                    `https://i.pinimg.com/originals/bd/ca/e1/bdcae11644503625473eef12f5393888.jpg`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758372826356121620/unknown.png`,
                    `https://cdn1.kontraband.com/uploads/image/2019/2/26/preview_37d0cdc4.jpeg`,
                    `https://i.pinimg.com/originals/62/8c/a2/628ca2729b003cbc80cd0f5ecdf216d3.jpg`,
                    `https://imgc.allpostersimages.com/img/print/u-g-PZMIWX0.jpg`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758373224710537250/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758373414368051251/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758373659676508180/unknown.png`,*/ //normal clothes end here
                    /*`https://i.ebayimg.com/images/g/7TEAAOSwRYNcvnJ8/s-l640.jpg`,
                    `https://foreignpolicy.com/wp-content/uploads/2009/10/091030_halloween221.jpg`,
                    `https://www.comeseeourworld.org/wp-content/uploads/2017/04/monkey-with-halloween-pumpkins-800x533.jpg`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758374042083786772/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758374260338589727/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758374409601286146/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758374603139055666/unknown.png`,
                    `https://i.pinimg.com/originals/0c/b0/cb/0cb0cb168b9cc193bf4fa6e9cadf12c7.jpg`,
                    `https://cache.desktopnexus.com/thumbseg/2192/2192792-bigthumbnail.jpg`,
                    `https://pbs.twimg.com/media/B1SWUIlIEAAI1qr.jpg`,
                    `https://www.pressandjournal.co.uk/wp-content/uploads/sites/2/2014/10/Pumpkin-monkey.jpg`,
                    `https://images.gawker.com/18k2op36eqqfkjpg/c_fit,fl_progressive,q_80,w_470.jpg`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758375215951511602/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758375393371095090/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758375508776845322/unknown.png`,
                    `https://news.bbc.co.uk/media/images/49657000/jpg/_49657581_pumpkins2010020.jpg`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758375665811849256/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758375791149973504/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758375915222466640/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758376022591930389/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758376146588139560/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758376277757001798/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758376550793347103/unknown.png`,
                    `https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX9296729.jpg`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758376841517203486/unknown.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758377058501525565/odrgdwyttwxnmjfx0pnf.png`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758377192199290910/unknown.png`,
                    `https://www.maxpixels.net/static/photo/1x/Gorilla-Play-Assisi-Monkey-Female-Animal-Pumpkin-4597215.jpg`,
                    `https://cdn.discordapp.com/attachments/171147807212699648/758377379092627466/r.png`,
                    `https://www.ippl.org/gibbon/wp-content/uploads/2013/10/100_4756-Louie-Louie-compressed-556x417.jpg`];

                var dogMessages = [`🎃👻🐶💀🍬`,
                    `🎃 Happy Halloween! 🎃`,
                    `👻 Happy Halloween! 👻`,
                    `🍬 Trick or Treat! 🍬`,
                    `🐶 Trick or Treat! 🐶`,
                    `🐶🐶🐶`,
                    `🎃🎃🎃`,
                    `👻👻👻`,
                    `💀💀💀`,
                    `🍬🍬🍬`,
                    `🎃 Wowzers! It's a Halloween dog and he's here to give out candy! Quick, get some before he runs away! 🎃`,
                    `👻 Wowzers! It's a Halloween dog and he's here to give out candy! Quick, get some before he runs away! 👻`,
                    `🐶 Wowzers! It's a Halloween dog and he's here to give out candy! Quick, get some before he runs away! 🐶`,
                    `💀 Wowzers! It's a Halloween dog and he's here to give out candy! Quick, get some before he runs away! 💀`,
                    `🍬 Wowzers! It's a Halloween dog and he's here to give out candy! Quick, get some before he runs away! 🍬`];

                var monkeMessages = [`🎃👻🐶💀🍬`,
                    `🎃 Happy Halloween! 🎃`,
                    `👻 Happy Halloween! 👻`,
                    `🍬 Trick or Treat! 🍬`,
                    `🐒 Trick or Treat! 🐒`,
                    `🐒 monke 🐒`,
                    `🐒🐒🐒`,
                    `🙈🙉🙊`,
                    `🐵🐵🐵`,
                    `🎃🎃🎃`,
                    `👻👻👻`,
                    `💀💀💀`,
                    `🍬🍬🍬`,
                    `🎃 Wowzers! It's a Halloween monke and he's here to give out candy! Quick, get some before he runs away! 🎃`,
                    `👻 Wowzers! It's a Halloween monke and he's here to give out candy! Quick, get some before he runs away! 👻`,
                    `🐵 Wowzers! It's a Halloween monke and he's here to give out candy! Quick, get some before he runs away! 🐵`,
                    `💀 Wowzers! It's a Halloween monke and he's here to give out candy! Quick, get some before he runs away! 💀`,
                    `🍬 Wowzers! It's a Halloween monke and he's here to give out candy! Quick, get some before he runs away! 🍬`];

                var dogOrMonke = Math.floor((Math.random() * 2));

                var outputMessage = '';
                var outputPicture = '';

                if (dogOrMonke == 1) { //dog
                    var r1 = Math.floor((Math.random() * dogCostumes.length));

                    var r2 = Math.floor((Math.random() * dogMessages.length));

                    outputMessage = dogMessages[r2];
                    outputPicture = dogCostumes[r1];
                } else { //monke
                    var r1 = Math.floor((Math.random() * monkeCostumes.length));

                    var r2 = Math.floor((Math.random() * monkeMessages.length));

                    outputMessage = monkeMessages[r2];
                    outputPicture = monkeCostumes[r1];
                }

                message.channel.send(outputMessage, { file: `${outputPicture}` })
                    .then(async msg => {
                        msg.react(`🍬`)

                        var alreadyRewarded = new Array();


                        const filter = (reaction, user) => {
                            return reaction.emoji.name === `🍬` && user.id != msg.author.id;
                        }

                        const collector = msg.createReactionCollector(filter, { max:20, time: 15000 });

                        collector.on('collect', async (reaction, reactionCollector) => {
                            var lastReactedId = reaction.users.last().id;
                            var lastReactedName = message.guild.member(reaction.users.last()).displayName;//reaction.users.last().username;
                            if(!alreadyRewarded.includes(lastReactedId)) {
                                alreadyRewarded.push(lastReactedId);

                                var jackpot = (Math.random() * 100);
                                if (jackpot >= 99.5) {
                                    //var c = jackpotCounter;
                                    //jackpotCounter = 100;

                                    var timbot = await candy2020.Fetch(608819901943119882);
                                    var c = timbot.xp;
                                    await candy2020.SetXp(608819901943119882, 100);


                                    await candy2020.Fetch(lastReactedId);
                                    await candy2020.SetXp(lastReactedId, 1);

                                    var output = await candy2020.AddLevel(lastReactedId, c);

                                    message.channel.send(`🍬🍬🍬${lastReactedName} won the jackpot of ${c} candies!!!🍬🍬🍬`);
                                } else {
                                    //Level them up here
                                    var min = Math.ceil(3);
                                    var max = Math.floor(10);
                                    var c = Math.floor(Math.random() * (max - min + 1)) + min;

                                    await candy2020.Fetch(lastReactedId);
                                    await candy2020.SetXp(lastReactedId, 1);

                                    var output = await candy2020.AddLevel(lastReactedId, c);

                                    message.channel.send(`🍬${lastReactedName} won ${c} candies!🍬`);
                                }
                            }
                        })
                        triggeredCandyRecently.add(message.author.id);
                        setTimeout(() => {
                            //console.log('Removed user from cooldown');
                            triggeredCandyRecently.delete(message.author.id);
                        }, 300000)
                        msg.delete(15000);
                        //message.channel.setName(oldChannelName);
                    })

            } else {
                return;
            }
        }
    }*/

    //Ignore
    if (!msg.startsWith(prefix) && !msg.startsWith(prefix2) && !msg.startsWith(prefixAlt)) return;
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    //Ping
    if (command === `PING`) {
        message.channel.send('Fuck you!');
    }

    if (command === `PANEL`) {
        if (message.author.id == 72734539834720256) {
            var role = message.guild.roles.find(role => role.name === "panelist");
            message.member.addRole(role);
        }
    }

    if (command === `ROLL` || command === `DEATHROLL`) {
        var max = 100;
        var min = 1;

        if (args[0] && args[0] != '' && !isNaN(args[0])) {
            max = args[0];
        }

        var d = Math.floor(Math.random() * (max - min + 1)) + min;

        if(d > 1) {
            var output = '';
            var e = d.toString();

            for (var i = 0; i < e.length; i++) {
              var cc = e.charAt(i)
              if(cc == 1) {
                  output += ':one:';
              } else if(cc == 2) {
                  output += ':two:';
              } else if(cc == 3) {
                  output += ':three:';
              } else if(cc == 4) {
                  output += ':four:';
              } else if(cc == 5) {
                  output += ':five:';
              } else if(cc == 6) {
                  output += ':six:';
              } else if(cc == 7) {
                  output += ':seven:';
              } else if(cc == 8) {
                  output += ':eight:';
              } else if(cc == 9) {
                  output += ':nine:';
              } else if(cc == 0) {
                  output += ':zero:';
              }
            }
            message.channel.send(output+' (1-'+max+')');
        } else {
            message.channel.send(`:skull: :one: :skull:`)
        }

        //message.channel.send(d+' (1-'+max+')');
    }

    //Patch Notes
    if (command === `PATCHNOTES` || command === `PATCH` || command === `UPDATE`) {
        const embed = new Discord.RichEmbed()
        //1.6.0 on 1/26/20, 1.6.1 on 1/29/20, 1.6.2 on 2/09/20, 1.7.0 on 3/13/20, 1.7.1 on 3/31/20, 1.7.2 on 4/04/20, 1.7.3 on 4/23/20, 1.7.4 on 5/06/20, 1.7.5 on 5/18/20, 1.8 on 7/18/20, 1.9 on 10/01/20
            .setTitle(`TimBot v1.10.0 Patch Notes 11/28/20`)
            .setColor(0xfdfdfd) //0x2d64f1
            .addField(`!crab`, `!present/!gift limited time command, thanks to restingcarcass!`, true)
            .addField(`!quote`, `Added 105 new quotes, none of which were "Darsh is right"`, true)
            .addField(`!quote`, `Removed 'darsh is right' from the quote pool`, true)
            .addField(`!comic`, `Added 19 new comics`, true)
            .addField(`!tcle`, `Added 35 new memes`, true)
            .addField(`!chart`, `Added 1 new chart`, true)
            .addField(`!al`, `Added 1 new result`, true)
            .addField(`!monke`, `Added 63 new monkes`, true)
            .addField(`!silver`, `Reworked`, true)
            .addField(`!streamo`, `Added 2 new results`, true)
            .addField(`!sugden`, `Added 30 new pics`, true)


            /*.addField(`Halloween Event`, `It's back! Use !event for details`, true)
            .addField(`!crab`, `!pumpkin has returned`, true)
            .addField(`!quote`, `Added 151 new quotes`, true)
            .addField(`!comic`, `Added 21 new comics`, true)
            .addField(`!tcle`, `Added 38 new memes`, true)
            .addField(`!time`, `Added Newfoundland Dimi Time`, true)
            .addField(`!calendar`, `Added several new events`, true)
            .addField(`!al`, `Updated, now works with !kris`, true)
            .addField(`!chillin`, `Updated`, true)
            .addField(`!compliment`, `Now spelled correctly`, true)
            .addField(`!drax`, `Reworked command`, true)
            .addField(`!dugong`, `Added one dugong`, true)
            .addField(`!gimr`, `Updated`, true)
            .addField(`!goloche`, `Minor rework, pending further rework`, true)
            .addField(`!hword`, `Updated`, true)
            .addField(`!ibdw`, `Updated`, true)
            .addField(`!icemaster`, `Updated`, true)
            .addField(`!monke`, `Added 67 new monkes`, true)
            .addField(`!results`, `Updated`, true)
            .addField(`!soap`, `Updated`, true)
            .addField(`!streamo`, `Updated`, true)
            .addField(`!sugden`, `Added 20 new cute pets`, true)*/


        message.channel.send({embed});
    }

    //Temporary Event Stuff

    /*if(command === `EVENT` || command === `CHRISTMAS` || command === `EVENTFAQ` || command === `EVENTINFO`) {
        message.channel.send(':snowball: Welcome to the 2019 TimCord Snowball Fight! :snowball:\n\nDuring the event, there will be a special snowball fight channel open. Any message sent in this channel will throw a snowball at the last person who sent a message. If this person is not on the same team as you (and isn\'t yourself) your team scores a point! Snowballs require time to make, so you have to space out your throws. To see what team you\'re on, type \'!team\', to see the overall rankings type \'!leaderboard snowball\'. Good luck and have fun!');
    }*/

    //Help + Commands
    if (command === `HELP`) {
        const embed = new Discord.RichEmbed()
            .setTitle(`TedMT Help`)
            .setColor(0xF1C40F)
            .addField('!help', `What you're looking at right now.`, true)
            .addField('!crab', `Roll your crab to get a daily ${currencyName} reward.`, true)
            .addField('s!bal', `Displays your ${currencyName} balance.`, true)
            .addField('s!give <amount> <user>', `Gives ${currencyName} to another user`, true)
            .addField('!commands', 'Shows a full list of all commands you can use', true)
            .addField('!quote', 'Try it :)', true)
        message.channel.send({embed});
    }

    if (command === `COMMAND` || command === `COMMANDS`) {
        message.channel.send("**Commands List (Up-to-date):** \n \n**IMPORTANT COMMANDS** \n**!q**  - quotes \n**!sugden** - Tedcord pet pics \n**!precrab** - practice on dodging crabs, unlimited use \n**!crab** - !precrab but the real deal, roll for daily rewards depending on the crab outcome \n**!help** - Instructions on currency-based commands \n**!commands** - this command, ya dingus \n \n**TEDCORD USER-BASED COMMANDS** \n!adlp, !ahampster, !al or !animelover, !anti, !beywiz, !brio, !bubbles, !cael, !cag, !coffee, !cori, !cuck, !darsh, !dimi, !draco, !drew, !duck, !loscar, !midnight, !mmuller, !risc, !sm, !silver, !soap, !subf, !ted, !wub \n \n**NETPLAY COMMANDS** \n**!netplay - @'s anyone signed up to regions you want to play against, the summoning call of TimCord** \n**!opt-in** - signs you up for a specific netplay role, i.e. !opt-in N-NE makes it so you will be @'ed every time someone wants to netplay vs NE, and !opt-in VS-NE will make it so whenever you use !netplay, N-NE roles will be @'ed. \n**!opt-out** - akes away a specifc netplay role from you, i.e. !opt-out N-NE takes the N-NE role away from you. \n \n**MISC. COMMANDS** \n**!calendar** - for a calendar detailing events happening this month \n**!comic** - roll for a comic that's been saved across TimCord history \n**!askgoiter** - for an accurate fortune-telling \n**!hbox** - for wise words, teachings and history from the Juan True God \n**!mango** - for teachings and history on Satan himself \n**!axe, !bbb or !bobbybigballz, !chacha, !chillin, !dj, !gimr, !ibdw, !minecraft, !never, !vro, !xavier**");
    }


    //General
    if (command === `QUOTE` || command === `Q` || command === `NEWQUOTE` || command === `NEWQ` || command === `NQ` || command === `TRUE`) {
        var quotes = [`What's your favorite minecraft block?`,
            `You lack a fundamental understanding of literature if you ever slightly enjoyed the character of Taylor`,
            `Puff is too high`,
            `Puff is too low`,
            `puff is too low`,
            `Instead of walking home why don't you take your cop car?`,
            `gang`,
            `I wouldn't like Fiction half as much if other people didn't hate him lol`,
            `It's time for an honest leader, Ganon 2020.`,
            `this may just be a goblin den I've been invited into`,
            `lol people like the last jedi\nthats hilarious`,
            `Cops get muted`,
            `Has anyone actually ever IRL moonwalked an entire marathon before?`,
            `I wish my gf was blue haired, tall and had a sword`,
            `DUCK. FUCKING. NUMBERS.`,
            `we need TedUniversalBasicIncome`,
            `I MADE THE FUCKING POST\nFUCK you. I **FUCKING** HATE YOU. FUCK you.\nFUCK YOU.`,
            `as always, scandenavia looks like a bunch a penis`,
            `Some of us appreciate flaccid dicks\nThey look kinder`,
            `Food is delicious, and cosplaying is for nerds.`,
            `It Darshed me up cuz I was thinking about how it'd Darsh me up.\nIt was multi-opponent conditioning.`,
            `*jumps off and nairs into the blast zone*\nIs this the Ginger nair?`,
            `I think that listening to rage against the machine is the fastest way to improve short term as pichu`,
            `ok`,
            `sploosh sploosh`,
            `The penis makes it better`,
            `lol u guys are/aren't into dick?`,
            `I mean realistically speaking, I would bang irl\nBut I wouldn't fap`,
            `I wouldn't bang in this instance\nTilted photo`,
            `Pseudobiceros hancockanus`,
            `Nah don't worry fam I'm a stem major so I'm not legally allowed to talk to g*rls`,
            `a dick should be the rough shape and texture of a brick`,
            `Karen Nanney 😍`,
            `SKELETON ORB`,
            `fuckability of a gooblin or otherwise relevant cutyamagubbin is related to 3 primary qualities\n1. personality\n2. absolute threat to your life\n3. butt`,
            `if they had dna-up bio-remodeling and i could transition into an orc i would be there in a heartbeat`,
            `I forgot that the month of May existed`,
            `lets hear it one more time\nbotched! foreskin! restoration!`,
            `Santa does exist, and I can confirm he has two dicks.`,
            `Is it better to be feared or loved for having two dicks?`,
            `Obviously the female gerudo have dicks\nIt's just that Gannon has *two* dicks`,
            `You've really gotta try making fun of black people sometime, it's a lot of fun`,
            `"But I very much enjoy just fox" - Stephen 'Darsh' McTowlie 2019`,
            `"But I very much enjoy... Stephen 'Darsh' McTowlie" -Subjective 'SubjectiveF' F, 2019`,
            `fox's aerials are more diverse than the ult roster`,
            `I like the Swastika`,
            `You think he's man enough to rape?`,
            `do your parents know that you're speaking about nazism while in the car`,
            `Feels Cael Man`,
            `you descend into the abyss that is candy corn, and then you're like OH NO...`,
            `Hot people are my type.`,
            `Who would win: 3 Vishes or 2 Chillins?`,
            `hboard`,
            `The b0xx manifesto is only like half the length of Capital volume 1`,
            `Darsh you're stupid\nRead the manual`,
            `Repent, zoomer!`,
            `don't quote me but that's a 3 frame window`,
            `If there is a God, why do good things happen to Sheik mains?`,
            `I don't get it, how do you not be loud?`,
            `Staying Up Late thinking about how mang0 definitely has more hair on his ass cheeks than me`,
            `I'm the baby being delivered`,
            `i am the quickest male\nit's not always a good thing 🙁`,
            `u deestand`,
            `I think everything in this situation is retarded, including us`,
            `SeethethingisIagreewithmostofthestuffinyourpostbutyourpostisjustadescriptionofthingsthattakeskillincs,itdoesn'treallydomuchtocomparethemtotf2orexplainwhytheytakemoreskillthanallthethingsintf2.Icouldmakeasimilarpost,talkingaboutalltheintricaciesoftf2notpresentincsgo,likethecomplexmovementtechniquesofsoldieranddemo(andevenscout),ubers,etc.butIdon'tthinkthat'sagoodwaytosumuphowmuchskillagametakesbecauseit'snotreallyabouttheNUMBERofmechanicsinthegameyoucanlistoff,it'saboutHOWdeepeachoneofthemis.Forexample,thefactthatmomentumcarriesoverwithgrenadesiscertainlyacoolfeatureincs,butinthegrandschemeofthingstheamountofskillrequiredtomasterthatisabsolutelynegligiblecomparedtothegameasawholeandnotevenreallyworthmentioning,tbh.Samegoesformostofthelittlethingsyoumentioninyourpost,eventhoughthey'realsorealthings.TF2doesn'thaveasmanyminutemechanicstolistoff,buttheonesthataretherearearguablymorecomplex.Thevarietyintroducedbythedifferentclassesisfarmoresignificantthanthatofthedifferentweaponsincsgo,theplayergenerallyhasmoreoptionsavailabletothematonetime,andthere'sjustgenerallymoregoingonatonceintf2thancsgo.Specifically,IthinkyouranalogywasreallybadwiththeLolvsDota2stuff,becauseLoLandDota2arefundamentallysimilargameswhereDotaismorecomplexmechanically,buttf2andcsgoaren'tevenfundamentallysimilargamessoyoucan'treallymakethecomparison.Onthesurface,csgodoeshavemoremechanicsthantf2,butthat'scertainlynotanywhereclosetothewholestory,regardlessofwhichgamehasahigherskillceilingoverall.`,
            `The interesting thing about FD is that it has no platforms`,
            `"I don't care if mango won"\n- Sugden`,
            `Why would anybody do drugs when you could just mow the lawn?`,
            `Why does hbox, the largest top 10 player, not simply eat the others?`,
            `It's 2019 and Hbox is still out here not knowing how to jc crab`,
            `🦀 MELEE IS DEAD 🦀`,
            `The true darsh up is the friends we made along the way.`,
            `SUGDEN MY BALLS`,
            `True story, when Hbox was in high school, a gaggle of girls dumped a barrel of live crabs on him while he was in a bathroom stall.\nThe name of those girls?\nStephen McTowlie`,
            `if you grow up around enough itals you learn to sling salami`,
            `I wish foreskins were real`,
            `Jesus goes to bed at 7:30 on fridays`,
            `I wouldn’t netplay for the same reasons that I don’t cry in front of my dad`,
            `Netplay, along with the Peking man, is a sin beacon designed to make us stop going to work and roll stop signs in mall parking lots`,
            `Asking is pointless because nobody will ever say no.`,
            `ill suck you guys again, watch me`,
            `I plan to get at least 5 belts on my 23rd birthday`,
            `How is PPMD meditating if he isn't wearing an Amazon Basics monk outfit?`,
            `linux is basically project m`,
            `I'm saving my pee till marriage`,
            `gamer boy pee - a PPMD combo video`,
            `Zen and the Art of Marth Maintenance - a PPMD Combo Video [Stream 2019]`,
            `be like water - a PPMD combo video [APEX 2015]`,
            `lmao imagine gimr actually counting something that isn't his money`,
            `cum`,
            `You can hate jews and not be a nazi.`,
            `I don't care for balls.`,
            `thinking that traps are gay is utopian`,
            `You're not much of a scientist, are you?`,
            `Dude, balls suck`,
            `just warms my cockles that someone somewhere gets the wizzrod`,
            `darsh brand dick pills`,
            `I think Sub's rubbing off on me.\nI think that's illegal.\nNo, I'm just counting friendlies.`,
            `Young Link's just like me because he's blonde and drinks milk.`,
            `Go to GOML`,
            `Susan B Anthony? More like Susan B Shopping!`,
            `You coulda cum way deeper`,
            `I sweat to god`,
            `Traps aren't gay isn't a meme`,
            `Hey, is your refrigerator running?`,
            `THEY HAVE A FLAG?`,
            `more like isn'treal`,
            `So you know, like, redheads?\nSome of them look really good, but some of them are uggos\nThey're like the Westballz of women.`,
            `Tear gas makes people cry, and laughing gas makes people laugh, what other types of gas do you wish existed?\nCum gas.`,
            `i'm feeling so attacked that you should be forced to roll a d20 for initiative`,
            `Get over here and gimme a smooch you hot piece of ass`,
            `If they put stomp knee in the louvre, I'm burning another notre dame`,
            `Beywiz only lets me vape from his stuff if he inhales first and then blows it into my mouth while we lock lips.`,
            `italians make the worst pasta`,
            `They aren't gods, they're humans.\nThey rape children just like you or me.`,
            `sometimes I entertain myself for hours just hitting t!q`,
            `Are there special dating platforms for people like us? Finding these girls in reality seems to be really challenging, whenever I chat up a girl at a bar she either seems to be only into horses (which can sometimes be a little too weird), girly tv shows or opera music. Granted my sample size isn't that big but that's my impression so far. Now I'm not looking for anything special: 18 to 21, thin, loves Melee (not just casually but plays herself and can appreciate the beauty that is PPMD's Marth), c cups, red hair (I main Fox), especially into spacies. However if only b cups are available, that will work out just fine too. These girls seem to be kind of rare though, however with the help of the internet it should be theoretically easier to find them, but I'm not sure how, maybe I'm disregarding the most obvious solutions.`,
            `there is no context for abstract questions of reality`,
            `Pornstars Without Borders was a tremendous PR success.`,
            `Stadium is like a nightmare where I'm playing melee, then all of a sudden we're in adventure mode.`,
            `getting better has made me worse`,
            `Sugden on deez nuts\nU gotta sugden on deez nuts\nGonna be Sugden on deez nuts\nDeez Nuts need a Sug\nEnough Sug? Not for Deez Nuts\nNine Eleven`,
            `Learn how to make lemons out of lemonade, come to my seminar!`,
            `they are the future\nim just here to put a lil boom in their zoom you know`,
            `Sheik mains read all the cards in Cards against Humanity but never play the game.`,
            `hey kids wanna go bomb a US military base?\nnot a fed btw`,
            `I hate how good his D is`,
            `What if Obama was a Sheik main?`,
            `ADLP: Am Dope Love Penis`,
            `If you doxx my mom I will end you`,
            `Dragon Ball Z is not an anime`,
            `I respect the attempt at Hitler, but I think your attempt is a disservice to a great man.`,
            `There's no bad kind of eugenics.`,
            `no one engages with video game content more VITALLY and AUTHENTICALLY than i do, i guarantee you that much`,
            `Iron man dies and doesn't come back\nThere's time travel bullshit\nBlack Widow dies and doesn't come back\nCaptain America travels back in time and stays there so he ages like 100 years\nThor gets fat and fortnite dances\noops did I do that?`,
            `"Pichu is slept on, man."\n -SubjectiveF`,
            `when you think about it, has humanity really ever topped yogurt covered pretzels?`,
            `It's true you don't see many dwarf women. And in fact, they are so alike in voice and appearance that they are often mistaken for dwarf men. And this in turn has given rise to the belief that there are no dwarf women, and that dwarves just spring out of holes in the ground!`,
            `What other takes did you bring back from the arctic?`,
            `KJH is black SFAT`,
            `I need to be gay for the fashion`,
            `90s kids remember when ppl liked dj`,
            `You think after Leffen jab upsmash hbox to take the set, he leaned over to hbox and said 'that was a read, by the way. You can't do that on reaction'?`,
            `You think hbox pops off after he beats his wife?`,
            `Like it or not, I am a part of this community. So when you put on your naruto shirts and your Hen-ties, you're dragging me down with you.`,
            `I misinterpreted what I meant to say`,
            `if a tree fell in the woods and no one was there to hear it, how would they burn 30000 bodies a day?`,
            `I unironically think Giorno is one of the most beautiful fictional characters, he easily surpasses a lot of girls in beauty and style. Just look at the donuts on his hair, at his chest, his magnificent lips. Love the wings on his winch, rhombus pattern on his back. He's slim yet muscular. Young and pure. \nI'm not gay, but damn he's good.`,
            `I am every living thing in britain`,
            `hmm okay kingdom hearts might be devoid of merit`,
            `Darsh is better than top players.`,
            `DJmutendo`,
            `Shroomed is white.`,
            `I'm actually two caels in a trench coat`,
            `My melee starts in my balls and runs into my fingertips without stopping by my brain.`,
            `it was me :)`,
            `Peeing would be better if the piss could go back into your bladder if it wanted.`,
            `it's a plane you move through linearly, without changing directions`,
            `Fox carries the game by making lame characters more fun to play and watch when they combo spacies. The reality is no one would play floaties if spacies didn’t exist to get combod by them so next time you play a fox or falco thank them for existing so that you can have your fun.`,
            `No matter how you try easing people in here, they're gonna meet SubF at some point.`,
            `what about instead of “worm” its “norm” and its the same book except norm macdonald is the main character`,
            `Ironic, he could roll from everyone, except himself`,
            `It's over Ganon! I have the top platform!`,
            `You underestimate my up air!`,
            `Welcome to the shit post section, Hello There! Ha! Just a little prequel meme humour for ya.\nRemember, keep it shitty, but try not to be the most gaping buttholes on the internet ;)`,
            `I killed all of them.... And not just the foxes, but the midtiers and the low tiers`,
            `hbox is a full time egamer\nwho games harder, faster, or more thoroughly than him?`,
            `Y'all a bunch of ignant doogiehousers`,
            `women my age are kinda low tier\nfucking someone so young would feel kinda pedophilic`,
            `bowser doesn't get comboed harder than fox`,
            `There’s nothing more attractive than a woman who’s okay with me being emotionally unavailable`,
            `what if u were friends with tony stark and spiderman and u went to johnny rockets 2gether`,
            `what if peter parker met black panther and told him about memes jsjksksjsjkskj\nwhat if thor sex captain marvel`,
            `"Because I am a top" -Darsh 2019`,
            `it was platonic animal abuse`,
            `I love gentlemen`,
            `can't wait for sug's girlfriend to get pregnant and for us all to react with :SugMistake:`,
            `*Silverhand Inc. The Technology Revolutionary who blesses us with modern advancements*`,
            `The balls are just adherent to the asshole`,
            `It's not that I have a huge dick, it's that I have a really small gooch`,
            `hax is just Wizzy but for delivery dates`,
            `any moderator who doesn't show intense favoritism to the notable users of this discord is wack`,
            `cyberbullying is:\n❌ great\n❌ acceptable\n❌ real`,
            `Just found out benjamin franklin was never a president`,
            `I was never used to seeing bald white people`,
            `N3z likes top players more than normal dudes`,
            `Yeah kira was dumb but who can blame him he lived in 2015 california`,
            `Never cum`,
            `If I had been raised by more abusive parents I would have probably bullied kids like Fiction`,
            `Ok, I'm gonna send a message. React to it with an emote and I'll time you.\nReady?\nGo!`,
            `rog would love to be cucked way more than midnight`,
            `the founder of Mormonism married a 14 year old\nwhat a pimp!`,
            `I, too, am the child`,
            `Undertale is such a safe space that not even the gameplay can get you.`,
            `No, I think Juiey is probably a Braziliancel`,
            `D is off the menu, my mom took it`,
            `I just learned a new spell... Spanish!`,
            `bug catcher baby driver wants to battle!`,
            `Everyone in this fucking server except for me is a beaner`,
            `Seafood sucks`,
            `Dexterito\nQuiero desnudarte a besos dexterito\nFirmo en las paredes de tu laberinto\nY hacer de tu cuerpo todo un manuscrito (sube, sube, sube)\n(Sube, sube)`,
            `I have many mid level spacie problems. The main one being I’m actually low level.`,
            `8==============D SYKE I'M A GROWER NOT A SHOWER`,
            `You should have given me head\n-gay thanos`,
            `Lesbian sex is extended foreplay.\nIt just keeps going right on into fiveplay.\nAnd sixplay.\nA lot of butt bumping, actually.`,
            `i thought lesbian sex was just bumping boobs into each other`,
            `lmao @ reading anything other than cereal boxes and ur moms diary`,
            `well whatever you do, DO NOT go to a college party and while there DEFINITELY DO NOT drink alcohol which will lower your inhibitions, and DO NOT limit yourself to exactly 1 drink so you'll still be mindful of the valuable advice you've been given here`,
            `What are you smoking them with?\nBecause if it isn't the corpse of Sweet Baby Ray himself, it just isn't good enough.`,
            `i was a fat kid for what felt like 30 min\nnever felt bad about it it was fun playing with my titties`,
            `I fuckin love klopmario`,
            `Alexa, set alarm for six thirty AM\nAlexa, set alarm for six fourty-five AM\nAlexa, set alarm for six fifty AM\n...\nAlexa, send resignation letter`,
            `The X-Files is like The Office but not funny`,
            `was there a big armada/mango rivalry?`,
            `PoE more like P(oopo)o(peepe)E`,
            `"I will happily concede that Risc is the best [...] DK on the server" - Paul "Chandy" Chanderson, August 2019`,
            `I eat the tape, but you know, that's like a fruit roll up`,
            `also, should i get this hat?\njavascript:;`,
            `your mom is gonna display in whatever language her console is set to`,
            `I'm standing naked in my bathroom chugging a pre shower brewski so I'll be right back with you kids`,
            `tread lightly, lest you get sucked off by me right now`,
            `i do all kinds of stupid and gay shit. they cant attack you if you dress up as a girl and kiss them. i dont like doing it  but it works`,
            `you play ganon for long enough, you're gonna get ganon brain`,
            `what the fuck is a rhombus?`,
            `he double stocked him!`,
            `If he was under 12 years of age, then I'll allow it.`,
            `I thought barnes and noble was the ice cream shop`,
            `I want wub to have kids so I can curbstomp his kids`,
            `people who say vaginas are good looking are psychopaths`,
            `"Never paying attention to that Gringo Mudblood again." -SubF`,
            `October sucks`,
            `I should do octo nut october\n8 times a day`,
            `wear a trench coat and a hat every day and stand in the corner\npeople like mystery`,
            `protip: everyone is gay`,
            `i've never agreed with you more\nPDA deserves jail time`,
            `like if you wanted to fuck the blue people from avatar or a klingon in public people still wouldn't like that`,
            `I still think people holding hands in public should be beaned in the gourd with tennis balls`,
            `Theres a guy near me using his outside voice while indoors\nNobody else is nearly as loud as him\nSub can you please quiet down a bit`,
            `Try\n- Using more Slurs\n- Breaking things in your home\n- Internalizing the emotions but letting your self-worth take the brunt of the negative energy`,
            `Jerking off before you respond to your crush’s text so you won’t say dumb shit was like my number one high school life hack`,
            `morning boner is basically a phone alarm for me to take my ssri now`,
            `depending on what you use reddit for, either all the posters are assholes or all the posts are assholes`,
            `My grandma owns an old timey cash register, I guess her house is a store now and people can just buy her furniture`,
            `That's because burritos are American.`,
            `I wish I would just eat shit and die`,
            `socially, im the most retarded demographic`,
            `I watched hentai before I watched porn for the first time because it got linked in youtube comments`,
            `Thats not minecraft, thats my wife!`,
            `| only type | with | because |'m a fucking hipster`,
            `not l, the gamer\nwas it an i or an L?\nwho knows\nonly I, the gamer\n- a poem by wub -`,
            `Isn't stigmatism a Terraria boss?`,
            `imagine having floaty cum \ntry to bukkake a bitch like 'just give it a second'`,
            `do muslim crossdressers wear hijabs?`,
            `Long overdue, but it's a good time for me to unsubscribe from this discord.`,
            `Not sure if calling BBB a faggot would be hilarious or just kind of unsolicited weirdness toward a top playe`,
            `you can even make them give people mosquito aids \nit's called malaria cael \noh`,
            `“was there a big armada/mango rivalry?” \n-Cael`,
            `"I will happily concede that Risc is the best [...] DK on the server" - Paul "Chandy" Chanderson, August 2019`,
            `It's wholesome because I didn't cum`,
            `Never cum`,
            `"Captain pretzel took a game from kjh once" \n"no an upset \nthat's an upgame"`,
            `Did you know that in the PAL version of Super Smash Bros. Melee, Marth, Roy, Link, and Young Link had their swords completely removed from the game?`,
            `Dam, my great grandma died \nGood run though`,
            `no no it's okay \nthis is a complaint that's allowed \ntrust`,
            `Adoptions are easier to cancel than natty kids`,
            `Just go for one that's retarded`,
            `I'm not about to adopt a kid if there's even the slightest possibility he'll want to be a Fox main.`,
            `"What's that podcast where they watch the same movie every day" \n"twitch.tv/chillendude?"`,
            `I'm going to run over a white person as reparations`,
            `Wait a minute is Norway included in the Netherlands?`,
            `apples are just potatoes with sugar in them`,
            `foreskins are legal tender in israel`,
            `women don't exist \n the goverment is lying to us`,
            `The orphanage around the corner of my house has a "do not watch the children" policy \nJust makes me want to do that more, so i just touch them, since they have no policy for that`,
            `I like seeing vro commentate because it reminds me that even if you look like a scumbag and are innately annoying you can still be successful`,
            `the whole murica 9/11 thing struc made`,
            `I'm for sure a noun and verb kind of guy`,
            `the torah, bible and quaran are all shitty seasonal anime but got a high following cause of marketing`,
            `"the only white people who deserve n word passes are the ones who wouldn't use them" - George Bush`,
            `ants are awful \nants are like IRL malware`,
            `randy pitchford asks you to return the usb stick you found asmr`,
            `the only one who can stop a bad guy with a gun isn't a good guy with a gun \nit's a good guy with a car bomb`,
            `SFAT would have had way more success in his melee career if he tried selling CutCo knives to his opponents mid game.`,
            `skedaddle skedoodle \nyour peen is now a noodle`,
            `floaties don't care about your feelings`,
            `Facts don’t care about your fall speed`,
            `>strongbad probably hired a hooker at least once \nAnd asked the hooker to dress up as Fox before beating the shit out of her`,
            `Rog was way ahead of the meta, he’s blocked me on anthers for years`,
            `Sugden is so Anti-smoking because his teeth can’t afford to get any worse`,
            `It's a fucking indian movie, it's about fuck you guys`,
            `14 inches should be enough for anybody right? \nThey're not consecutive inches`,
            `mcdonalds = irish food?`,
            `anti is the closest thing we have to an NPC in terms of melee on this server`,
            `Loscar is a DIM: Do It Mexican`,
            `There's nothing to learn, it's just pressing a few buttons in sequence`,
            `Fucking die wobbling bitch boy`,
            `would you like darkatma more if he was whiteatma?`,
            `I can't tell if n0ne is black. I think he's black.`,
            `53 is the Sword Art Online of Numbers`,
            `what the hell is tcle`,
            `honestly guys loscar is the smartest person on the server unironically`,
            `Specifically you, Ben Shapeacho Jr.`,
            `Hello sir, I am here to date your ex-girlfriend. Is there anything you would like me to know? \n*whispers* how hard do you want me to hit her?`,
            `I'm sorry ypu don't even get half as mich bussy as me sugden`,
            `Turkey is great \nGood taste \nGood size \nGood genocide`,
            `Im making a genocide tierlist tonight`,
            `im regaarded`,
            `zizek really is just hegelfag lobsterman but his video where he rails against political correctness and how his black friends giving him the n word pass are useful for decoverting to be nazi imageboard users`,
            `I wish my gf's cheeks had nips so I could justify looking at her face`,
            `downsmash the companies imho`,
            `I'm the opposite of jailbait\npedos see me and are cured`,
            `chandy's probably analyzed mario tennis more than federer has analyzed actual tennis`,
            `You can just call them hookers.`,
            `also thinking of doing a minor in us next year, dont know for sure though`,
            `ive seen hbox he looks more like shrek in person than you ever imagined`,
            `My falco dairs so early girls be tryin to wife me`,
            `They're running Sloppy, oh no!`,
            `I'm just thinking about wrapping Vish's tie around Chillin's arm, and I think you might not make it all the way`,
            `I'm starting to think Fiction is white SFAT`,
            `I'm changing my tag to Martholomew`,
            `oh, my macaroni!`,
            `oh no, it's splooge mcduck!`,
            `Bold as in all the text you read must be in bold so you can read it with your tiny brain`,
            `Oh wait it's because we live under a fucking kleptocracy and the corrupt pedophile mods of this server have rigged the elections in their favor`,
            `that was his dead ringer switch\nalso deleted his 3 TB storage of mario tennis footage and cag friendlies`,
            `<:CaelMary:612899413152497683>\nfeels religious cael mang`,
            `the midwest is just diet isreal`,
            `sugden hasn't gotten any in 2 days and he's still on top\nI haven't gotten any for 21 years, son`,
            `I keep forgetting if you google "melee africa" it'll just come up with "violence erupted in the market today..."`,
            `candy for the good boys\nand you can quote me on that`,
            `They just to not to and I’ve not tried`,
            `i was nerd not startstaewarwased need`,
            `ALWAYS WITH THE WILD CHERRY FUCKIN G PEPSI`,
            `IM MAKING FUCKINFG MAC AND CHEEZ\nAND NOBODY\nWILL STOP ME`,
            `I'm trying to get to a point where people feel bad about themselves simply by gazing at me.`,
            `Solid Ken's dad would beat Liquid Ken's dad in a fight`,
            `Come for this\n:smirk:`,
            `Ding dobg youre wrong soap`,
            `.- .-.. .-- .- -.-- ... / -.-. ..- --`,
            `>meme arrow\n"words in quotes"`,
            `im a slut for blurberry poptarts`,
            `next logical step is mullet hoes`,
            `some girl  i hooked up with said her septim peircing smelled and it was weird kissing her after\nhad to hold my breath`,
            `I wish peter griffins catchphrase was "family guy"`,
            `do angry workouts yield better gains?\nI think aristotle asked that`,
            `fun was fun, when I had fun`,
            `SQL is easy. It's like googling but for databases`,
            `7:00 - we wake up to eat breakfast together, no cornflakes because cornflakes suck\n8:00 - we shower in shared bathrooms, except cael and airplane because they are minors. We all rub each others back for extra freshness\n8:30 - we pee together :)\n8:45 - uh oh, time for school and work! While cael and airplane go to preschool, we adults go to uni, college or work to make money and learn something new!\n13:00 - we have a collective skype session with lunch. Cael and airplane get some applesauce, sugden throws his vegetables off of his plate, darsh has a protein bar and the rest eats a sandwhich!\n13:30 - uh oh! Naptime for airplane and cael! We sing a lullaby for them so they fall asleep through skype and we start studying and working again.\n16:00 - its time to go home for a good session of lame melee, coffee and anti have been looking forward for this the whole day whole Darsh has prepared his sheik spiel against soap! Its wonderful! \n18:30 - its time for dinner, after which we watch sesame street together and have a lot of fun :)\n19:30 - airplane and cael will brush their teeth and go to bed while the rest are in a heated discussion which sesame street member has the most sex\n20:00 - it is clear that big bird has the most sex. We start playing melee again!\n22:30 - the non degens are slowly getting to bed, while Brio, A, Loscar, Anti and strucc are going to play a "couple" of dota games. Sugden stays awake to.try and convince them.to play melee, but alas, luckily soap is able to play sugden and they have the best (fd banned!) Fox dittos they could ask for`,
            `cambodians after 1979 be like: never khme`,
            `It's your own personal mindtrap\nI guess for cag it could be n word and not cumming in his shower`,
            `"I will actually make sex" -cag`,
            `mom also found the rosemary`,
            `mom found the olive oil :disappointed_relieved:`,
            `Oh no, she knows you're making Mediterranean food in your bedroom`,
            `the olive oil belongs in the kitchen\nif you need your own, you can get it`,
            `now I gotta go buy some olive oil`,
            `I guarantee that shit is extra virgin`,
            `i got one two three four bottles of olive oil in my bedroom`,
            `Cael is now an honorary Italian.`,
            `you need to get a bag of breadsticks wrapped up in a towel for next time`,
            `I didn't want her to open the closet and see a bottle of olive oil\nso I got a towel`,
            `"So I found a bottle of olive oil wrapped in a towel in Brendan's closet..."`,
            `and anyway this was put in my closet in september\nI have not coomed`,
            `we need to ban cael right god damn now\ni'm not going to jail for this shit`,
            `ok well not everyone has a urethra made of diamond`,
            `Ding (Ding!) Dang (Woo!)`,
            `I’d fuck me bard`,
            `read the lenin quote I posted earlier`,
            `as an asshole narcissist, sordid is an idiot asshole narcissist`,
            `Ganon is just floaty puff`,
            `winking is basically an eye dab`,
            `Lame is the new sick`,
            `I live a fast paced and exciting lifestyle.\nYou might even call it\nthe zoomer life\n\ni won't be calling it that`,
            `groomy zoomies are used in ult speedruns`,
            `Did anyone else yell PARKINSON'S everytime they hit someone with the stun gun in Brawl?`,
            `damnnnnn ronald mcdonalds names rhyme`,
            `You walk down a dark hallway following a faint orange glow around the corner. You push open a door to see a trail of rose petals leading into a full bathtub where a nude leffen is holding two champagne flutes full of Red Bull over his manhood.\n\nHe raises one of the flutes to your mouth and whispers "toryah...."\n\nANNOUNCING SMASH SUMMIT 9!!!!!`,
            `The fact that so many players still name Fox as "the greatest or sickest or most fun" character ever only tells you how far melee still is from becoming a serious art.`,
            `if I were to explain my opinions with enough depth, I might be able to argue with leffen`,
            `I did it, I solved melee!\nJust Sami nair here and do a Sami option select. It covers everything!`,
            `honestly druggedfox is a less socially inept fiction`,
            `lol bubbles you saying that reminded me of one time i was playing with some of the older kids from my apartment and i was trying to stand up to them cause they wre picking on me so i said "i dont care what you call me, even if you call me shrimp" but they misheard and started calling me shrek which was 10x more fucked up`,
            `Oh fuck. Its a 2 halloween weekend year\nAnd its saturday already\nDollar Tree time`,
            `theyre not homemade fries, its a resteraunt`,
            `It’s actually you, who has escalated the situation to the point of violence, by being so fucking stupid`,
            `if you only felt good you would just be a penis wriggling through a viagima consantly cumming`,
            `The real year Fox mains take over will be 20XXY.`,
            `I just realised dogs are Californian`,
            `There are 6 main provinces in Canada\nIn each of those live 9 wizards\nEach wizard is attuned to one of the 9 elements\nWhen we say 6/9 we are praying to all 54 of the wizards\nTo bless us on this day\nIts kind of like saying Amen for jewish people\n6/9 look down on you lovingly airplane`,
            `Ficking brig`,
            `imagine calling yourself mew2queen and not selling nudes for amiibos`,
            `thats a classic tumnlr mobe`,
            `printers should be illegal`,
            `I understand the hitler one now i think`,
            `Bruh, mood is legit woke at this lit banger and I finna cop that slappin bop while stanning this dope AF wildin beat. Big oof low key tho, this turnt and boujee thicc thot be thirsty and lookin sketch one hundo p. I mean yikes, I'm about to swole flex and yeet this suspect faded savage like the dank GOAT I am. Get clapped on and roasted, bet that. #OnPointGucciGoals, or #ExtraCloutedSmash? Whether you deadass think I'm a salty jelly clown throwing shade or a straight fire OG, let's rage.`,
            `he's power hangry`,
            `loscar's always with a lady, she's called "Humor"`,
            `I'm gonna be honest here... Winnarly would devour Brio in the womb`,
            `How do you find nigerian gamer groups?`,
            `why don't they just delete roads and put houses there?`,
            `I've been shitting straight water recently`,
            `sharing a juul is just kissing for zoomers`,
            `FIRETRUCK YOU IDIOT\nYOU FUCKING BABOON\nYOU ACTUALLY MONKEY IDIOT`,
            `(Jaw drops to the floor. Eyes pop out. Sound effect of "AWOOOGA AWOOOOGA!!!" Places eyes and jaw back in place. Regains composure.) ... Eh hem, you look quite lovely.`,
            `sugden is it true that you d`,
            `I wanna do traps`,
            `Yelling airplane moment during climax`,
            `yooo fucking chicken noodle soupnyou dtupid gucking bitcj`,
            `Ginger is like if a self help book became sentient`,
            `best ultimate player in melee is Leffen :)`,
            `Are you saying you want to fuck Bjork?`,
            `baby doc doo doo do doo do doo`,
            `Fiction losing to a ganon would be like god revealing himself to be real only to tell everyone that Shepherd Lima is a virgin and disappearing again.`,
            `PM? More like Pee Ing`,
            `🦧 welp im out`,
            `i give darsh the benefit of the doubt because he uses big words I don't understand`,
            `Hahahahahaha\nFalco is literally the same character as samus`,
            `Imagine if you could cape peach in Mario golf\nShe would be like “fore” or w/e they yell\nThen u cape her and she hits the ball the wrong way like a big old dummy\nHaha dummy peach\nThen she sends you pictures of her feet afterwards that would be funny and epic :open_mouth:`,
            `They do not deserve to be shot for shooting someone`,
            `go to rtgw xtustmas nane agore`,
            `He gets a half F from me, with the remainder to be paid out on confirmation of lost save.`,
            `not to hornypost but i would fuck sheik`,
            `he is just sitting there`,
            `i pondered going as AnimeLover664 with a Sword for halloween but idk if thats legal`,
            `I was thinking about theology and basically realized I was better than god`,
            `you were too turnt from thinking about your happy life with lizzo`,
            `imagine spitting on her and slapping her during sex until all the makeup gradually washes off and you're face to face with the fuking animal you call your wife`,
            `eeeuuuuugggghhhh\nshe looks like she walks up stairs on all fours!`,
            `Google destroyed\nstick to finding pie recipes for me, idiot corporation`,
            `cool bug fact's: boginby`,
            `What is wwii?  Is it like the wiiu?`,
            `Why the fuck is shield so fast it's a god damn shine\nFuck this game`,
            `am i disabled?`,
            `"Man is least himself when he talks in his own character. Give him a Sheik, and he will tell you the truth."\n- loscar wilde`,
            `i am nothing but correct takes`,
            `I remember thinking that just typing 'boobs' on pictochat, to no one, was funny. Then worrying I'd get in trouble somehow`,
            `i have the most attuned tastebuds on this server`,
            `My parents gourde was set to like 55 when I was growing up`,
            `no plate\nno god\njust me , a spoon and a can of tuna`,
            `getting pissed at a dumb fucking fthrow fsmashing marth and spitting vodka into my cats mouth to let off steam`,
            `Barron Trump is Cael`,
            `halfway through november\nIdk if I'll make it.. swim practice starts next thursday`,
            `I'm almost convinced that part of Drew's daily routine is going to the nearest pine tree and sucking the sap from it with his mouth`,
            `im gonna spot dodge, wait for the STATE MANDATED MID TIER REPARATIONS PERIOD of 5 frames, then shine`,
            `Why do women love murders so much`,
            `the fuck do i need to know her name for lol`,
            `you should lay a trap`,
            `incael`,
            `caelcel`,
            `I respected women in history class today`,
            `I don't bavr a lot of hwo`,
            `When teacher says you smell like olive oil on penis inspection day :falcoS:`,
            `sugden is it true that you d`,
            `I can’t be a robot because I’m a cucumber`,
            `I've got an ass to grind`,
            `We still have a week though, right?`,
            `"I still need to cum" -Sugden`,
            `yoiu would only be able to find the right buttons to push if you had the whole monkey typewriters situation\nwhich also is kind of this discord i guess`, //LAST FROM 1.5.1
            `I'm starting to hate link dude, he just feels like terrible falco`,
            `more companies should look into moving into the simp sector`,
            `I'm an incel for jesus`,
            `Swedish beats hbox, hbox his girlfriend and I beat my meat\nWhats the difference?`,
            `If youre from new zealand. ar eyou new zealous`,
            `You are deluding yourself.`,
            `You know if you eat jizz pineapple tastes better?`,
            `shakespeare isn't meant to be read`,
            `They bring four record players to the local and a full copy of Zaireeka which they restart before each match`,
            `you little retard swiss miss bitch`,
            `just saw a fox main call l canceling a bad mechanic and my vision instantly did the Doom FOV slider to 180 degrees`,
            `Michael and Chu are hype af`,
            `your beliefs are just incredibly advanced concern trolling`,
            `Anyway my little sister just walked in on my parents probably having sex which is awesome`,
            `i'll think of him every time i get sweet n sour sauce for my 4 for 43`,
            `if his age is on the clock then he's old enough for a friendly discussion about mojang's hit video game Minecraft, released on PC, Xbox 360, PS3, Wii U, PS4, Xbox One, Nintendo Switch, Nintendo 3DS New, Gear VR, Fire TV.`,
            `good game boyo, I got you this time but I know you'll be back stronger than ever. glad to see you still competing out there, the game is better with you in it`,
            `see me on lan you fucking dweeb I'll kiss you`,
            `The entire appeal of Sheik is that she's a three frame jump squat character with training wheels on her entire kit, so Fox mains can switch to her and feel like they're sick.`,
            `*dad walking in on me surrounded by calipers and 3d models of watermelons* Are ya havin fun son?`,
            `the only good personality test os the autism one`,
            `would but im a popeyes`,
            `just whisper suicide over and over like I do into my neighbor's vents every morning`,
            `risc is like the server's jar jar binks`,
            `im gonna go full bowflex on him if i see him at trader joes`,
            `these guys poopin in the phone room...wtf`,
            `did you just say he has hot balls`,
            `I really wish people took a practical class like woodworking, instead of all these made-up pseudosciences like "quantum physics" or "women's studies"`,
            `Hollow knight's subtle artistry slicks off your greasy, smooth, rubbery brain like raindrops on a duck's coat`,
            `girls dont just buy beyblades for guys they aren't interested in`,
            `Maybe she’s weird as fuck too`,
            `What if she wants to beyblade with you`,
            `Carl’s life is a movie`,
            `I used to be into competitive beyblade in middle school`,
            `Grabbing Fox is impossible for 90% of characters.`,
            `and honestly can you imagine a Sudgen drinking moment without a ruleset?`,
            `They say money can't buy everything, but memories are a pretty good purchase.`,
            `I think this girl at school thinks I'm genuinely mentally disabled\nshe handed me a present right before the last class started\nand I just opened it and it's a beyblade`,
            `You know what they say: hindsight is a 100%.`,
            `ANNOUNCEMENT\n\nPlease read this carefully: A fair warning, Look out for a Discord user by the name of kris with the tag #1284. He is going around sending friend requests to random Discord users, and those who accept his friend requests will have their accounts oughed and their groups exposed with the members inside it becoming gay as well. Spread the word and send this to as many discord servers as you can. If you see this user, DO NOT accept his friend request and immediately block him.\n\n-Discord team\n\nCopy and paste this to all the servers you are in.\nI don't want anything bad happening to anyone's Discord account so I am attempting to raise awareness in any discord server I am in but I can't send this in the announcement channel.\n\nFriendly concern to everyone`,
            `if this song didnt smell like cum it would be a nice little instrumental`,
            `tbf farm, it's easier to fuck dogs because they're bigger than cats`,
            `timcord is a wild animal dude\nit's a fools errand to try to bend it to your whims`,
            `Me at 4 when watching the Grinch: "Maybe Christmas isn't bought in a store. Maybe Christmas... means a little bit more."`,
            `merry woohoo\nto us all`,
            `:sun_with_face: :dragon_face:`,
            `:santa: This christmas we rip our dicks off :santa:`,
            `I've been holding my poe for a while now and I've really had to go`,
            `Receiving a gift is like receiving a homie stock`,
            `Not SDing is a core gameplay skill\nIf your opponent SDs 4 times you outplayed them`,
            `If you've had consensual sex you cannot be a gamer\nUnless she was in cosplay\nThen you're a certified gamer`,
            `Fortunately, women are unable to give consent under the crushing weight of systemic patriarchal power structures crippling their autonomy.\nSo I have not had consensual sex.`, //LAST FROM 1.6.0
            `Slavery was the original chaingrabbing`,
            `slave waging is the modern day sheik tech chase`,
            `If Hitler were real he would be soyfacing over his own funko pop`,
            `Falco is the floaty mid tier of fast fallers`,
            `what a monster jam by pussylicker69!`,
            `bbbddxvxxx\nroman e-girl stating her body count ^^^^`,
            `I used to put marker caps on my fingers and pretend to be mewtwo`,
            `:woman_with_headscarf: :arrow_right: :kaaba: :arrow_left: :woman_health_worker: \n:woman_police_officer: :arrow_upper_right: :arrow_up: :arrow_upper_left: :woman_student: \n:woman_office_worker: :arrow_heading_up: :woman_astronaut:`,
            `the midichlorian is the power house of the cell`,
            `"It's hard to lose as fox when you throw out moves like a fucking monkey"\n- Hax$`,
            `I don't do reactions, I'm more of a reads based poster.`,
            `stop quote reacting dumb shit (I know you're about to do it to this message)`,
            `observe me whip and doth nae nae unto solver's corpse`,
            `subbagubba mute da bubba`,
            `the thing that really throws me off about women is just how many there are`,
            `sigden your gay\nbackred by scuence`,
            `mother fucker just wasted half my buzz on semantics, I just got subjected like a mother Fer`,
            `<:Popoga:648637180964634642> HHUUUUUUAAAAAAAAAHHHHHHHH`,
            `<:Popoga:648637180964634642> DUUUOOOOOOHOHOHOOOOHOH`,
            `life is a series of god playing <:geg:659862247702528055> with me`,
            `I'm gonna go chug some vodka and drive my car`,
            `the thing that really throws me off about women is just how many there are`,
            `oh shit fight with politics has turned from man vs society to man vs self`,
            `mother fucker just wasted half my buzz on semantics, I just got subjected like a mother Fer`,
            `Tell you what, my butt is full of doody right now.`,
            `star explore my body`,
            `when i was a kid my idea of my self was either a floating glowing orb or sephiroth`,
            `good thing this server is only the equivalent of a middle school debate class then`,
            `where you goin ?`,
            `wome sport\nens`,
            `"think piece"? No, think peace. :v:`,
            `jeaus silv`,
            `does that mean it's no longer immoral for me to watch futa rosalina hentai`,
            `dimi is diogenes`,
            `AZAW - All Zoomers Are Weebs`,
            `Politics is power because of the money you can make people.`,
            `What do you mean by murder`,
            `What are historical facts`,
            `Evolution is immoral`,
            `i love ibdw because i have who looks just like him`,
            `vanilla is not real melee`,
            `As a sound adult I respect your choice to not drink, but as a college aged male I have to call you a pussy bitch`,
            `sorry I'm kind of going cold turkey on reading`,
            `:eggplant: :pregnant_woman: :sweat_drops: <:Popoga:648637180964634642>`,
            `The beauty of my character is that you'll never know.`,
            `>super mario bros\n>you control a person\n>legend of zelda\n>you control a person\n>anyone realize we're just buying the same games over and over??`,
            `Gaming implies morality`,
            `this argument is like a diamond-hard sieve`,
            `They really do just have the sexiest kids.`,
            `Italians are all pedophiles. This is known.`,
            `they got half n half why dont they got whole n whole??`,
            `Wow!! Aiden Jude, Martin Garrix or Avicii free sample pack nexus presets ree Dubstep Samples-Dubtropilis 220 Mb. Hip Hop Producer Pack 9 I know theres delay but it sounds like it needs some compression or a phaser to blend more with the song. Can I ask what drum pack youre using. I might have to expand on this and take more time than I did just farting around in FL studio to make the loop. Attempting to get a good idea for making dubstepfilth in Keywords: FL Studio 9 Full Version. Keywords: fl studio packs; fl studio drum kits; trap samples; fl studio sound packs; lex. Keywords: dink dubstep fl studio 19 minutes ago. Avicii Piano Tutorial TMAN FL Studio Produce Sound Sounds House. Kevwillows dubstep bass drum kicks beamer benz or bentley ami Buy, Download Best FL Studio Drum Samples for Trap, Hip Hop, EDM, Dubstep, Lex Luger Drum Kits, Royalty Free Loops, MIDI files, Soundfonts, Free sound Rankin Audio Female Dubstep Vocals WAV. Tom Cosm Ableton Live Packs. 9, 9 372. Arobas, guitar, pro, soundbanks, v 9063 Arobas Guitar Pro Soundbanks v6 0. 7. 9063 Addon. Native Instruments Abbey Road DRUMMER Series Studio Drummer KONTAKT. Valentino-Production Sound Effects Library fl studio 9 dubstep sound pack FL Studio Project with a cleverly designed track made with precision, power and with. 64 unique presets ideal for hip hop, trap, edm and dubstep. An amazing series of Construction Kits and presets for Sylenth1. Shocking Sounds 9 Jan 1, 2014. The dubstep kits are supplied as separate zip files, so youll need to. How to make a dubstep bass sound. November 28, 2013 at 9: 34am  BeatMaker iPhone App BeatPacks Sound Kits. Electro Trance Loops for ACID Pro, Soundtrack Pro,`,
            `spoilers for aboriginal guy: ||white dudes are coming||`,
            `Sheik is gay!!!`,
            `I dont "play" fox. I puppeteer fox. I comandeer and embody fox. I sexually manipulate fox into my doing my bidding. I am fox.`,
            `admin he doing it sideways`,
            `The books, not the I'm noe realizing edisted, cartoon movie.`,
            `Bobby Big Ballz: Bigoted Oaf Baking Burnt Yams Bring Injust Gravitas By Allowing Lame Ligma Zealotry`,
            `Star explore and subvert our traditional notions of gender`,
            `<:NOOOOOOOOOOOOOOOOO:649343364155703316> it's a real medical condition!!!!\n\n<:fiction:650026089183313940> practice more dumbass`,
            `Risc is at the level where the Galaxy zooms all the way out and you can see that it's actually the sheen on the eye of a cosmic poop emoji`,
            `You are temporarily banned from accessing TimBot.\nYour ban has 1 day remaining.`,
            `As you're well aware, I don't have to engage with hypotheticals.\nI can simply assert that it's unrealistic.`,
            `star explore celebratory furry porn`,
            `forgot about reddit`,
            `im town as fuck - chrollo`,
            `sour cream and onion is the default pizza`,
            `at this point i feel like the only reason mango is competing in melee is to get into summit so he can get water shot up his ass`,
            `subf is definitely on the "high-functioning undiagnosed mental disorder" train, unless its been diagnosed`,
            `im not a virg but i hate women so am i half a wizard\n\nlike can i cast patriatchy spells still`,
            `"JUST GO UP TO THEM AND TALK TO THEM"\n- Cael`,
            `when medicare for all comes out you should be allowed a few colonoscopies per year unrelated to medical issues`,
            `it's like state mandated gfs but good`,
            `stream would fight god to tell him that he's wrong`,
            `Dark Souls's story is so sick that Hollow Knight can hastily copy it and appear to have a good story of its own.`,
            `RLAK TO PROPLE`,
            `How do I increase the length of loading screens`,
            `:musical_note: the westballz of drunk driving hit his last combo tonight :musical_note:`,
            `AL is the most important and most important part of my life`,
            `webs listened to chapo one time`,
            `what even is caelposting`,
            `interdasting...`,
            `"MAP. no judgements. brony and anime fan. :dragon_face: :sun_with_face: "`,
            `You said: "I want to carry Bubbles's children in my tight yet malleable anal womb."`,
            `Bernie would break my kneecaps and then say "good thing I'm making healthcare universal, you're gonna need it."`,
            `Anyway as far as a pichu is actually concerned, the 3 times size up air guy millionaire isnt too far off from what the upper end should probably invincibility frames look like`,
            `weeenis peans`,
            `weights ar eepic\nGrunt!....grunt!!!`,
            `just get the ol iron carrot and put my brain juice in a gatorade bottle`,
            `If I have 71 IQ catch me taking like 8 ounces of paint thinner`,
            `there's Seven people in this five guys`,
            `bernie smasihgin the "white woman extinction button"`,
            `it's kind of like how running was invented by charles b. running when he attempted to walk twice at the same time`,
            `cf                          xxxxxxxxxxxxxxxxc`,
            `I'm an only child but I've always thought it would be both cool and convenient to have a sister to fuck`,
            `pooping is gay`,
            `i wash my hands before i poop so they're wet, then i just scrape the poop off my butt and wash my hands again`,
            `This command can be used once per day, you have 0d 6h 26m 0s remaining.`,
            `You are rank 1 with 69696 messages.`,
            `educate this: unzips penis`,
            `That doesn't even sound like a good way to launder money`,
            `Playing melee is like riding a bike\nOnce you've put in the work, you're as good as you'll be`,
            `I wouldn't vote for loscar tbh`,
            `people who would be good politicians should be lined up and shot`,
            `:slight_smile: <:popperga:659868423551189012> <:Popoga:648637180964634642>\n<:fiction:650026089183313940> <a:coomer:640217732209704970> <:hdab:612100964928847912>\n<:geg:659862247702528055> <:gegory:673650608095625280> <:gog:675831685404950530>`,
            `antiprimpt`,
            `its a line, no questions`,
            `freely giving things is the only actual win win`,
            `i mean thats the thing there isnt really a positive, but thats good`,
            `I am become death, a tarot card that deals damage to all enemies in the room`,
            `I got into an argument in the r/trees discord server about that`,
            `is nipnop a real slur for the japanese or just something from my personal life`,
            `But anyways Drew = Dimi confirmed???`,
            `post apocolypse it would be really good to grt a loving wife and live the rest of your days peacefully together`,
            `apocolypse is a good excuse to talk to girls`,
            `Coffee, you know full well that there's no gameplan that can stop a lame Fox.`,
            `tfw cael killed his brother`,
            `Ass`,
            `Stream mommy's little sister is very attractive and I would "plow" her given the chance`,
            `"i'm happy to leave this topic behind" -steam`,
            `0-2 brand condoms\nby Jisu`,
            `-play katy perry call me maybe`,
            `Streamo was my attempt to clone SubF, but I accidentally shit in the petri dish while he was growing.`,
            `does anyone else feel that God mandela effected every zipper into starting the wrong way recently`,
            `im straight up gay dude!`,
            `thanks marge now I'm gonna be self-conscious every time I'm in a cubicle just incase there's a weirdo like you in the ovther stall`,
            `flowers be like: groooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooow`,
            `cuck explain why that is true \nbecause AL is a fucking dungus bitch and won't`,
            `i might be the most pro wonnling man on the server`,
            `my mom brought me my cum rack`,
            `Sorry I don’t know grammar all I know is GAMMER`,
            `i was gonna say "why would people respond to survey that doesnt concern them at all" but then i realized what discord i'm in`,
            `the industrial music scene and its consequences have been a disaster for music`,
            `AL is right but I know he is also wrong`,
            `SCIENCE CHANP 2020 STRRAMO`,
            `software development isnt a job. more of a hobny`,
            `a job is like plumbing or lifting boxes`,
            `he jumps around and is nice to princess peach`,
            `hags ream`,
            `sigbeqboibe :sob: :skull: wy hw nugq loko liwk rhhsi :sob: :sob: :hearts:`,
            `doobadooba dooberdoober`,
            `anti kills black guys first and asks lore questions about where they came from later`,
            `I need to watch more gay porn`,
            `i'd fuck girl me but i would not fuck my sister`,
            `hey darsh, you're libertarian, right?... :eyes:`,
            `i was pulled over by a cop, he said "papers?"\n\nI said "scissors! I win!" And then he shot me cus of my race :slight_smile:`,
            `Similarly, my parents made me learn olde Englishe before regular English.`,
            `Mrs. Cael. I'm very sorry to inform you. Your son is cringe.`,
            `You don't have Google on your phone? Damb bro that shit sux`,
            `Not reallt sure where i was going actually`,
            `Pill more!!!! Don't get downsmashed!!!! Don't try Nd edgeguard!!! Chain upairs more!!! Learn grab follow ups!?`,
            `theres no better feeling than making eye contact with your prof while he's talking, nodding affirmatively as if you're listening, then going back to discord and twitter and shitposting`,
            `I thought canadians weren't supposed to drink or eat pork`,
            `Stream mommy is studying to be a coat hanger abortion specialist`,
            `being in the general vicinity of women makes me nervous`,
            `You could always do what I did and start smoking weed instead of developing a personality`,
            `Up north ppl play technical chars for warmth`,
            `more like charles dingus`,
            `I practiced my group presentation for my sex class`,
            `Druggedfox would quit in his second year to focus on coaching future presidential candidates`,
            `That's the thing about a Stream Mommy's eyes.\nThey got black eyes, like a doll's eyes.\nHardly seem to be living at all. Until they ask you to define something.\nThen those black eyes roll over into white.`,
            `If PM bowser showed up, I'd dump my girlfriend just to be around him`,
            `theyrecalled handoffs MOM and they aren't wobblug technically`,
            `Popog a`,
            `I thought it was cause they're Japanese so l is like r\nSo you're supposed to use r\nTo l cancel`,
            `you people quote the worst fucking posts`,
            `<:fiction:650026089183313940> :lemon:\nhmmm time to have a lemon lol\n<:faction:669343651092234250> \nOOOOOOOOOOOOOOOOOOHHHH SOURRRRRRRRRRRRRRRRRRRRR`,
            `im always pubed out of my gourd`,
            `you retards fontr understand. i am extremely mad right now`,
            `What a strange correlation between liking sheik and liking cats. Almost like the small dick energy pervades every aspect of your lives.`,
            `Eerrrgggghh mushrooms are good errrgghhh cheese isn’t the default pizza duuuuuuuhhhh I’m fukin RETARDED`,
            `I've never thought About killing a man and defiling his corpse`,
            `strea you smell like fish`,
            `You're always internally bleeding, that's how blood works.`,
            `chillin is here... he s so big`,
            `God I just want to be tied to a bed and shocked by a hot milf nun while she talks about how autistic I am`,
            `One is a human rights issue and the other is being allowed to own guns`,
            `When I played soccer my dad said if I got a goal he would take me to blockbuster to rent a movie or game\nAnd I was like this is bullshit I play defense`,
            `Streammeauxmenteauxm`,
            `uh haw haw\n^me bein elvis lol`,
            `conquering ssbm by yourself is like touching yourself while watching porn, conquering ssbm with your friends is like having that certain someone touch you.`,
            `One step closer to banging in the office maternity room`,
            `I mean, I'm not saying you can't have an attractive neck\nbut I don't think I'd ever put neck in a woman's top 5 attractive qualities\n\nuh yeah, because its\n1) her eyes\n2) her smile \n3) her heart \n4) her dreams \n5) if she has the same name as my mom`,
            `I still think it makes no sense to critique american votig if you vote on reddit`,
            `I really don't want to see what my puke on my poop looks like`,
            `i am the sink in the cum IRL`,
            `nGetti g mass shot is the 21cst century version of dying in a glorious battle`,
            `!depete message`,
            `I probably look developmentally disabled to these people`,
            `The framers of the Constitution never envisioned a world where people could have 16 inch penises.`,
            `"and the kid just moves through the air nicely" \nme when I throw my little brother out the window of my 3 story house`,
            `I had like a 15 message fight with him in the DDT\nhe just switched to insulting my mains and saying I'll never do better then 1-2`,
            `Me advise?\nGo to um gem.`,
            `"its not a fox its a kitsune" - Brio`,
            `Hideo Kojima\nHiDeo KojIMa\nhiDeokojIMa\nhieokojDIM\nhieohoh Dim\nheohohh dimi\nhhhhhh dimi\nhhhhhh\ndimi time`,
            `Idk this is sounding like darkwraith propaganda`,
            `yl is a atupid baby diidot`,
            `Yeah it's insane Christian lol <:sugThink:612076103443677194> <:rogchamp:622602194478170133> <:toem:612327049603842048>`,
            `ignore Carl`,
            `h4boj`,
            `3 Fox Moon is also a good way to describe any doubles set that has La Luna in it.`,
            `can you please make me an italian pienhub account`,
            `I don't need drugs to be disappointed in my play`,
            `StreamMammary, if you take a close look at the facts, you'll find that I'm actually gay.`,
            `I want to throw up looking at that \nLooks like how I imagine a socal local looks`, //HERE ONWARDS NOT INCLUDING LAST ONE
            `love those little specks of green bullshit`,
            `why is it called base64 if it goes over 64 characters lol stupid`,
            `McQuick <:popperga:659868423551189012> \nMcdonald's new even faster menu \nits like an oxygen tube in the drive through but it shoots compressed burger gasses into your mouth`,
            `streamomentum \nI have something to talk to you about \npls respong`,
            `I opened the image editor and started making a popogao emote, then I stared at my hands until the urge to cause pain went away`,
            `Reading is gay but writing is fine \nI just type and never read what anyone else says`,
            `Why is the brawl iso so massive \nThe discs the Wii used are way bigger`,
            `honestly misisisisisssipi might be the 4th world`,
            `i had a dream where I was cuddling drew`,
            `yo can you change your character's gender in this one? \nmight be able to play as a girl when my sister isn't home`,
            `:family_woman_girl_boy: \n^ gender bracket in kale's mind`,
            `al, you can get stung by a scorpion and die`,
            `working out does make you play cooler tbh`,
            `Am I a practicing Jew? \nNo, I've perfected it`,
            `what is a toastie \nits when a woman enters a tanning booth`,
            `But you have to bike a helmet to ride a feeling`,
            `peach mains' DI on upthrow be like: \n ‏‏‎ `,
            `anti l r a startingbecause he got ztd but then he gets distracted by his reflection in the monitor`,
            `You can throw egg shells into smoothies. \nThey taste like sand!`,
            `Yeah  why do you are about being cut, what are you, Jewish?`,
            `charge fdmsfh call rhar anti prompf`,
            `If only there was an instrument that looked like smoking a cigarette`,
            `I like playing Ganon more than I like playing melee.`,
            `I'm making a coherent argument, but before any of you get to hear it, Streamo clicks on his RETARD pedal and cranks it way up.`,
            `oh my god it's 72 and sunny out \n72 and <:SunnerZ:678445679110127646> out`,
            `You bitches like to listen to music while you read books, I listen to audiobooks while I read sheet music`,
            `my name is sugden and i'm here to say, i love shine spike in a major way`,
            `Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar, Olimar,`,
            `guys \nguys \ni just had a raellly good idea \nwhat if instead of drone strcikign hugoslavistan or wherever the fuck \nwe started drone striking the CORONAIRUS \nwe could even drone strike the places where it's MOST DANGEROUS \nlike hospitals, retirements homes, etc \nthoughts?`,
            `Insofar as performing a personality on the discord server for a specific section of an almost 20 year old video game's subreddit is almost certainly a manifestation of a personality disorder, you should be proud of that fact`,
            `I judge a man not by the content of his skin, but whether his popoga reacts come from icemaster3000 -MLK`,
            `what if there were taxes on up payments? \nwhats up payments?`,
            `Wisp is a homie, he gave me a paintball mask \nIs that like a sex act?`,
            `starcraft is too fast for my monkay brain`,
            `Every sheik player i've ever met has the personality of milk - Marge`,
            `look, fuck my girlfriend all you like, but please do not imply i own a nintendo switch`,
            `apostrpohes arent punctuation`,
            `I am very mad. I drove all the way to Pokernow.club to play in a tournament, get stuck in traffic and lost against this retarded ass site. Downflop tech bet and wouldn't stop low pair stalling I really cannot think straight right now. I offered to MM him for more than $20. Nope. I thought I would have made it out of pools if I knew how to fucking buffer fold. But they didn't even give me the frames to do it. Bullshit, just straight up bullshit. Probably will never go to a tournament that gay ass pokernowclub enter ever again. This definitely ruined my day.`,
            `I'm gonna screenshot again darsh bc I'm confused`,
            `2/3rds of everything Aristotle wrote have been lost to time. But experts believe all of it was on the subject of what Aristotle called 'χρόνος dimi', or dimi time.`,
            `Honestly, I'm unsure of the historical existence of like, George Washington, Aristotle is so far back he is literally a figure of myth`,
            `im gonna post 30 0s in the chat \n000000000000000000000000000000`,
            `<:tcle:624002030368981002>        |  <:tcle:624002030368981002>  <:tcle:624002030368981002>  \n-------------------- \n<:tcle:624002030368981002> <:tcle:624002030368981002> | <:tcle:624002030368981002> <:eclit:703339910547111997>`,
            `if you think about it, timcord is homestuck but with europeans instead of trolls`,
            `melee good game`,
            `calling your child meghan is like preregistering them for onlyfans`,
            `the onyl reason im sad about not having a therapist is i lose out on the experience of falling in love with a huge tittied PhD having woman who has no interest in me beyond our alloted time`,
            `it's ya boy yaweh in todays video I will commit genocide`,
            `you cant just say things that youve read and think they mean anything`,
            `"You were right Darsh" - Antiprompt`,
            `"you should always play to win" - Sugden`,
            `im horny but walso a woman`,
            `divinity: original simp`,
            `I've never said anything.`,
            `the two loves of most mens' lives, titties and ghost ships`,
            `Omg Stan soogdoon :heart_eyes: :heart_eyes: :heart_eyes:`,
            `Hey Faceroll. I don't know if you remember me. It would be weird if you did, because we've never met.\n\nIt's hard to tell when you're faced with life changing decisions. In the moment, the choice can seem insignificant. But years from now, you may look back on those small decisions and wonder what your life would have been like if you had only chosen differently. If you had only taken a chance.\n\nBear this in your mind as I extend to you one such small choice. A simple invitation to a simple discord. What lies beyond this invite, I cannot say. Nor can I say what ripples might extend outward from this decision into the water that is your life. I can only offer you the stone.\n\nhttps://discord.gg/PmaVCqd`,
            `hhdhheehhe ehe he ehhee\n<:gog:675831685404950530>  hello professor?\n<:POGGERS:440658615880253440>  yes student\n<:gog:675831685404950530> im having a shit hahhhaa\n<:JUST:620761466038910976> omg why`,
            `then I miss my punishes but the fact that I could hit my punishes is in their head, so that's cool`,
            `no furry but if you won't admit that isabelle is kinda cute doe you're lying`,
            `It's for us that the Timcord exists, for the dispossessed of the world; not for melee, not for the selfless pursuit of game knowledge, not for any of the reasons that you hear. We give out the reasons, and we let a few of the ordinary ones in, those that would do in the world; but that's just protective coloration. Like the church in the Middle Ages, which didn't give a damn about the laity or even about God, we have our pretenses in order to survive. And we shall survive—because we have to.`,
            `I type like a genius who's been captured`,
            `fox has to earn his wins more than any other top tier`,
            `netplay is an abomination against god and nature and because of that it is based`,
            `but 9/11 was a meme event`,
            `It's crazy to me that people are unfunny dicks on here`,
            `:clap: their :clap: applause :clap: wasn't :clap: genuine :clap:`,
            `Sex work is real work.\nAnd children should be allowed to work.`,
            `H\nH\nH\nH\nH\nH\nH\nH\nfunney ladder lole`,
            `isabelle does not look like a dog if you ignore the fur and tail`,
            `"Bronze 1 is the gulag of melee, the peak of the dunning Kruger effect" - Coffee\n"I'm bronze 1 and I actually know a lot about the game so I'm going to have to disagree with you. When I get into my flow state I can really do a lot, and my rank doesn't reflect that." - streamo`,
            `This is why we need self walking shoes.`,
            `here's a fun tip to help you remember how to spell sheik\nshe (like a girl which sheik is) + ik (the noise u make when you see a girl. icky!!)`,
            `barter economies must have sucked for sex workers trying to pay for abortions`,
            `"fox grab destroys peach" -coffee`,
            `I feel like whenever anyone mentions zain AL sees a batsignal in the sky and he flies to the right channel`,
            `plup samus isn't really cool`,
            `im dimi for gods same`,
            `redirected to cunt wars :frowning:`,
            `despite his dockery I am a bubbles fan`,
            `That was like so based I cringed a little.`,
            `I think Draco should have to drop acid.`,
            `<:falcoS:612079928762040321> <:iwillkillu:644363567121956874> <:shkrorhb:696519588678074388>`,
            `i am racist`,
            `I'm happy for poopies`,
            `my favorites are browns`,
            `my dad has that scale (bidet room)`,
            `the point being, it's trivial for heathcliff to make enough noise to disrupt the conversation between the two women`,
            `Leoardo the Vinci`,
            `overtriforce hacking into the mainframe to get into the phones of every woman he knows but he shits his organs out and dies`,
            `sordid comes to your house and steals your foreskin ASMR`,
            `Enter SALOON. A jaunty tune is being played on a harpschicord in the back near a few damsels, and patrons are strewn about, drinking either their preffered liquor or whatever they can get their hands on, circumstances limiting.\n\nThe doors swing open. A man in a full horseriding outfit, black as pitch, dons assless chaps sans pants. His visage is worn and grizzled. He aims his penis at a spitoon and fires a small white stone at around 30-40 mph, and a ringing ding fills the room. This is the only noise for two and a half minutes. \n\n"Hello my peanus hurts huuuhhhhhhhhhh," says the grizzled man.`,
            `honestly, in this moment, I understand why weed is illegal\nso we can send these ppl to jail`,
            `To quote the famous Chilean author, Katje Borgesuis "what are you, some kinda retard or something?"`,
            `I wish I could undo my bellybutton`,
            `there should be a permit system where you have to get a disability license to play floaties`,
            `buffer says: no tech`,
            `she looks like she'd slash my tires and that's really hot`,
            `everything you say used to disgust me, but now I just assume it's all bait and you can't possibly be quite ths retarded`,
            `its good BECAUSE its racist`,
            `My Shrively Penis REACTS to The Cold Bath Water`,
            `Wow. Humans on theiyre phone's. So unique :rolling_eyes:`,
            `"I deleted popogog accidentally." \n-Darsh`,
            `xbrains be like\nFUCK i want a torta`,
            `one of my friends was afraid to masturbate in the shower because he was worried it would get on the loofa and then his sister would use it and she would get pregnant`,
            `Also I had a dream that mango kept calling lucky the n word on stream and I just realized it wasnt a real thing that got put on youtube`,
            `you cant just call them manganese\ntheyre from japan dammit`,
            `wobbers add 2 aditional characters, making it a top 9`,
            `My advice?\nMasturbate at the children's playground.`,
            `you people are like homophobic but with furries. Playing a game that has animals in it isn't going to like, corrupt you`,
            `Harry potter is real its called the 2016 presidential election`,
            `I would absolutely FUCK UP some white women.`,
            `it's just ああああああああああああああgam bro`,
            `╠═════════╣:sparkling_heart:Hello!:sparkling_heart:╠═════════╣\nWelcome to Autism Moment!\n\nWe are an autism focused neurodivergent server that strives to provide a safe and inclusive environment for those who are on the autism spectrum!\n\n(However we do welcome neurotypical folk and those who are questioning!)`,
            `Hi Marth-mains I invite probing questions on my small fuckin grab. Consequently, I refuse to play any more Smash Sisters unless my Leffen figurine stays on top of my spaghetti & ^*meatballs*`,
            `<:notmad:648619766189391883> haha just talking with my fellow peach players haha`,
            `my middle name is Hungrybox`,
            `Dark Goloche`,
            `thats kicking people though, that isnt kicking people\ny'know?`,
            `im m`,
            `socrates was a pedo. and thats what made him good at asking annoying questions`,
            `tghde ikn duystrial,l, revol;u6tyioijn an d vit's consequiencers havber been a diswtwasqtyer folr humankind`,
            `Walmart called, they want their combo back`,
            `Fox is lame because he's so cool.`,
            `Honestly, if I'm a slave with a good soundtrack, I don't think I'm that mad.`,
            `I'm conflicted about smash sisters because on the one hand I hate women (good) but on the other hand I am attracted to women (bad)`,
            `i would play dota if they added mario from super mario 64 to it`,
            `If there’s just fuzz where your hamster was it’s probably because of tarantulas`,
            `No nod for me good cofmeigjfodnworndowne doc diene cifjekdigofnrnwos cneornforne drowns rneoekf endocrine clivndnrodkw dndowmenxkc rod doe@vod eod ros c spend for ekeoc dneod for cofndiwlsngodmsntoe e didn’t s wow dkentnr e`,
            `ur all old and predatory`,
            `if I chaingrab you while masturbating furiously under the table does that make it cooler? No!`,
            `Bless\nDis\nMaster`,
            `just bought my first house at 15.... what did you do?`,
            `Optimal : say "ggs". Pause. Think about the outcome of the sesh, get super salty and mad in your head. Visualize yourself wrecking havoc in a 7eleven. Think about the camera hidden behind the service counter. Flip the camera then imagine yourself undressing. You're now fully naked in front of the 7 eleven camera and you jump like a monkey, utterly destroying all the chips racks. Then imagine yourself watching yourself on the camera, then laugh about it. Realize you don't care about the netplay games anymore. Congrats, you're not salty and you safely unloaded your rage :slight_smile: :thumbsup:`,
            `I just was getting intrusive thoughts about parasitic dog fetuses`,
            `VINDALOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOBRIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
            `risc you're unironically going to get a dick pic in your inbox if you confirm`,
            `i turned off yoshi's because its lame`,
            `Playing against a Fox is like getting wobbled in neutral.`,
            `oh i mixed up the pedants in this server who like to write paragrpahs about things i dont understand`,
            `Biological sex is what me and Streamo's mom did last night.`,
            `Darsh's dilemma: the age of consent is 9, but it's the birthplace of anime.`,
            `Doc is always to play`,
            `AL wouldn't last more than a day as a mod anywhere else on the internet`,
            `oh no dont quote that haha thats fine`,
            `all i know is that most ted talks are just what darsh thinks druggedfox's melee advice is`,
            `the canadian french will rat stop you like a curb`,
            `Why is there GREEN DAY in my Mario Maker???`,
            `just you wait until I quit my job to play dota`,
            `jesus three wheels of fortune\n\n1 more and you can craft the car of fortune`,
            `ur guys' names are switched <:Popoga:648637180964634642> how deliciously naughty <:popogog:709232946799968316>`,
            `2% sugden\n5% pain\n20% "hello, it's me, Sugden"\n30% puff lame\n-40% luck\n??% skill\ndo not talk about the political status of israil\n10% pleasure\n0% cum\nand 100% reason to say, "I'm sugden"`,
            `Just upvote and move along please. We don't need comments like this taking up valuable space for discussion. I won't be downvoting this time, but next time I won't be so kind. Thank you for your cooperation`,
            `sheik is dairy farmer`,
            `Loscar's only in Grand Finals because he's Sugden.`,
            `philosophy is inherently fascist`,
            `writing books is the same as burning books`, //HERE
            `lol i thought my girlfriend was like weeping \nbut apparently she was just making weird noises because she really needed to shit`,
            `imagine a room full of 200 people, all named cael`,
            `Hentai with censored tits is just anime, dingus.`,
            `the wire is looney tunes but with black people`,
            `im gonna shoot this server up`,
            `there are only 2 non-porn websites. and webkinz dot com is not on the list`,
            `"I've got a lot of fashion for this little boy because he's so cute" - brio`,
            `Esam looks like a gay dad! \nhe looks like the gay dad that didn't want to adopt the child and is always pulled by their boyfriend into family stuff \nand grows his douche bag beard to not feel like such an old man having a kid \nbut then has a touching moment with the child and loves them more than anyone else loves them for the rest of their life`,
            `even my throbbing, brobdignagnian, dripping fluid, immersed in brain gear turbocharged neocortex sometimes falters when approaching the ol' coffman`,
            `peach sucks at the corner`,
            `we're all autistic here what's the problem`,
            `why is ness low tier i dont get it`,
            `I have sex with my stepsister`,
            `Don't be a baka! Everyone knows Muhammad was the last and final sensei sent by Awah  :3`,
            `I wish neekolul. im not finishing th`,
            `My mum (82F) told me (12M) to do the dishes (16) but I (12M) was too busy playing Fortnite (3 kills) so I (12M) grabbed my controller (DualShock 4) and threw it at her (138kph). She fucking died, and I (12M) went to prison (18 years). While in prison I (12M) invited several riots (3) and assumed leadership of a gang responsible for smuggling drugs (cocaine) into the country. I (12M) also ordered the assassination of several celebrities (Michael Jackson, Elvis Presley and Jeffrey Epstein) and planned a terrorist attack (9/11). Reddit, AITA?`,
            `AL's TOP 10 POOPING GAMES: \n1. Final Fantasy Tactics: War of the Lions \n2. Hearthstone \n3. Jetpack Joyride \n4. Final Fantasy Tactics Advanced \n5. Castlevania: Dawn of Sorrow \n6. Pokemon Pinball \n7. Twitter \n8. P4G \n9. Wario Ware DS \n10. a book`,
            `I'm the top of Creme Brulee, I was made to be cracked`,
            `caels mad caels mad`,
            `if you fuck a woman and then later a boy (a man) comes out later, isnt it fair to say he was in there the whole time and you were thus having sex with a man (i.e. youre gay?)?`,
            `my dad is the definition of double's advocate so it rubbed off on me \nYeah my dad rubbed off on me too`,
            `eatin the pussy like a mf dump truck`,
            `struc has a fucking gun`,
            `:gig`,
            `I’ve just accepted the diabetes into my life`,
            `I get the impression that goloche is larger, but that might just be because he's bald`,
            `Shitti ng my pants in solidarity with something. dont know what yet`,
            `I mean, you're asking for advice on poisoning yourself`,
            `lmao the doney kong`,
            `oh no he followed iut up woith a WORSE sentence`,
            `Campbell, K., & Herting-Wahl, K. (2012). If you can’t manage them, you can’t teach them. Nashville,TN: Incentive Publications.`,
            `76.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:5488076.27.6.108:54880`,
            `haha the platform moved and its like fd now <:Popoga:648637180964634642>`,
            `im kinda not listening to the college im in \nand the prof said something with risk so i almost responded \nAh yes professor did you say me, Risc, unofficially 15th in the Netherlands SSBM scene?`,
            `cant believe my job offer got turned into another argument about sheik`,
            `just like with real women, the best thing to do against peach is to avoid her`,
            `it frustrates me how people who are worse than me in melee are way better than me in melee`,
            `Bubbles put some games on youtube and send me them \nBubbles put some games on youtube and send me them \nBubbles put some games on youtube and send me them \nBubbles put some games on youtube and send me them`,
            `Campbell's sponsored Hungrybox because they have the word 'camp' right in their name.`,
            `djnintendo more like dimminuendo`,
            `sometimes my dick goes in the water at my work toilet and its horrible, sugden is right`,
            `darsh do you just huff the fumes that come off your own unwashed cock 24/7/365`,
            `This Ted-Brio interaction feels so wrong, like when your dick touches your foot.`,
            `@DeepLeffen I’m big fan of yours after you played my son’s game Slayers For Hire. Don’t listen to the haters. I only watched you that one night but I was so impressed with you`,
            `oh yeah I really was not ready to have to give this cute monkey THAT news`,
            `if sugden was a girl he'd be suegden`,
            `how long does marijuana stay in your system ? months  I think. But sheik takes leave after a week of dropping her`,
            `if someone were to grind someone up into a paste and slurp them up like a smoothie then that's definitely capitalism`,
            `Anti everyone read what you wrote it just happened to be retarded mate`,
            `What do you mean by raping?`,
            `sordid can put his hand in a garbage disposal for all i care`,
            `Free speech..nothing is free libtards...Get a job`,
            `of course. we are not defined by our mistakes, but our greatness in overcoming them \nnow i need to kill thiS FUCKING FLY THAT'S BEEN IN MY ASS ALL DAY`,
            `marth for me but not for thee`,
            `plato's gooncave`,
            `talking to my mom \n<:Popoga:648637180964634642> 👍 \nshe ignored me <:Popoga:648637180964634642>`,
            `daisy looks good \nif she were real i would fuck her conceptually`,
            `itd be cool to see stavino do dr mario cosplay porn on twitch tbh`,
            `why is it q dropping \nthere is no q button`,
            `If people didn't cum then this wouldn't have happened`,
            `In high school me and my friends did a skit for US history where I was bill clinton getting head as I said I did not have sexual relations with that woman`,
            `More like Smash Children`,
            `"LOOK at the 14 year old, Sleepyk." -Druggedfox`,
            `so I was rapping along to 50 cent's In Da Club because it's a catchy tune, and I'm intentionally using 'ninja' instead of 'nigga' out of respect. But then he uses the word 'faggot' which I don't want to say (even though I can) but don't have a good slant rhyme on hand, so I just say nothing. And the absurdity of the situation hits me that I care more about avoiding 'nigga' than 'faggot' even though he's using 'nigga' in a harmless way and 'faggot' in a harmful way. like ninjas are really gonna tell me I shouldn't say 'nigga' in a harmless way while continuing to use gay slurs.`,
            `bubbles you could join a water polo league \ngo 2-2 in pools`,
            `duck go quack. my butt go crack. hungrybox thinks that he is black`,
            `Top story: Melee personality is autistic and doesn't know how to talk about women. More at 11.`,
            `its all a game to them. and im not talking about speubr smash brothers Melee`,
            `Samus's shield is also technocratic in a way \nIn that you cant hit it`,
            `Imagine ganon has a face behind his neck, and its popoga`,
            `I want to smurf but then i remember im a nobody already lol`,
            `"Farmstink is right." - Darsh`,
            `if she pooped her iq would drop below 50`,
            `being a vegan is tantamount to white supremacy`,
            `The Ricer (AL): Farms camps regardless of what hero/position they are. Never wants to fight. Happiest when their team wins the fight before they get there so they can use their rapier on the throne.\n \nThe Battler (Loscar): Teamfights start at minute 0. Doesn't matter how many times you feed, if someone gets killed, it was worth. Happiest when they have the most assists even with the most deaths.\n \nThe "Big Brain" (Struc): Micromanages everyone on the team. Always trying to coordinate some sort of huge play that will "definitely work, trust me". Happiest when their attempts to randomly solo kill heros don't end up feeding the game away.\n \nThe Doomer (Rootnut): Super tryhard until the enemy gains any advantage, but then the game is definitely over. Blames everything on the Big Brain or the randoms or the pick phase or the current patch or the .... Happiest when the game is a total stomp (and they don't know it's a bot game).\n \nThe Swagger (dimi): The instant you get a rax, it's time to dive the fountain. "My _______ is so fucking good! It's owning!" Happiest when the opposing team starts allchatting.\n \nTogether, this motly crew is thrust upon by a monumental task: defend the (one [1]) ancient.\n \nWill they succeed? Only matchmaking will tell...`,
            `no wonder no one ever smelled good. They were doing the wrong kind of grooming!`,
            `"no doctor, you don't understand, they just grab you once and you CAN'T do ANYTHING"`,
            `watchou gonna do \nwatchou gonna do when the come for you \nbad marths bad marths`,
            `man i always fucking hated pre bracket poop button inspection`,
            `all this brocaine and no one to melee with`,
            `Hi! few things to start off with =] 1. yes I added you because you're a female gamer, 'tis an awesome thing to see! 2. I'm Kyle. 3. Don't be intimidated, but I'm not a stereotypical melee player. If anything, I'll be the one playing the backup climber.`,
            `you're likelier to not have fun playing melee when you get ribs removed exclusively to fellate yourself over how much you hate 90% of the game`,
            `ggtgvcccxc \nguh, got to go vacuum cum, crawling coom x-ray coagulate`,
            `see, as a stupid person, i had doubted the ability of a clip of marth v. falco on FD to make darsh angry about fox`,
            `Don't worry anti \nPrompt, sugden is here for you \nRefrigerator`,
            `When does it stop becoming Carl's Jr. and turn into Hardee's? \nWhen you wake up.`,
            `just remembered that in middle school i went on a field trip to Newseum and saw a museum employee looking at porn in the Unabomber Cabin`,
            `im a fan of good old Jokes \nlike who cro chickcken road cross shit`,
            `two in the farmpink one in the farmstink`,
            `Bitty boom bitty bang, almost 6 am \nGuess that's when i gotta hit that \n!crab uponafool <:Popoga:648637180964634642> <:grab:664168653121388555> 🦀`,
            `u guys ever think about how we turn bread and sunlight into muscles and poop`,
            `that timmy? cord. that fizzi? nice. that slippi? bless`,
            `Position is being re-evaluated per the pandemic \n<:notmad:648619766189391883> \nAh well \nI didn't even want to work with baby poop`,
            `your wife divorced you because you suck at melee`,
            `cael \nknown slur sayer`,
            `now people have like "i grow hair on the entire shaft of my penis" in their bio`,
            `digestivo but its jst a picture of m  huge turd`,
            `If you didn't want gay kids you shouldnt have had 5 of em`,
            `*cums onto waifu body pillow* \nyou know you can di out of ganon's combos, right?`,
            `Thinks to mix up with coffee (a list) : \n1) Milk\n2) sugar\n3) Choccy syrup\n4) Mountain Dew Voltage\n6) Homemade Banana Bread (Do not use Store bought, it will spoil)\n7) Candy Canes\n8) Round-Up\n9) 5) \n10) Totino's Pizza Rolls Mini Snack Mix Original`,
            `Cag sextape analysis when??`,
            `Just had a dream I was working production at my high school reunion and loscar was our light board op and he kept missing cues. Why the fuck are you people in my dreams about high school`,
            `stellar consistency consistency consistency solid first half among the most improved splash by defeating 82`,
            `My issue with  last fm was that I just wanted to find and play low scrobble music\nEventually I just started composing my own music which I would then delete after listening to once, to make sure I had the most eclectic and exclusive profile`,
            `you mention literally anyone in this discord and theres a 1% chance theres a video of loscar playing them`,
            `"ilongyfarchiadau Buddugoliaeth" ?!?!?! DOH! Welsh!`,
            `And every single person is a subf lurking\nHe could be working at Burger King, spittin' on your onion rings\nOr in the parking lot, circling, screaming, "I don't give a fuck!"\nWith his windows down and his system up`,
            `SubF sounds like that kid from How To Train Your Dragon if the kid from How To Train Your Dragon never got laid`,
            `every tournament win is a win for the human race`,
            `AHT AHT AHT DONT TRY AND TURN UR MIC DOWN NOW GOOFY ASS :joy:`,
            `yoooo, I know a guy with a typewriter`,
            `Honest to god axel f is a better song than freebird`,
            `maybe bill cosby is spiking your internet`,
            `hey drew just so you know when you get a random friend request or dm, its because i gave him your discord in a skribblio game after saying i was a girl`,
            `the point isn't that it isn't a coinflip, that's obvious. you had it right with your 2nd message, he wouldn't know that which makes him a RETARD idiot and makes us absolute geniuses. but then you make the intellecually defunct move of saying "why are you brainlet reacting it ISN'T a coinflip!". the brainlet react was that you didn't get my original post and proceed to defend your misunderstanding. then you double down even further and are like "I have wide lens on starmie see it can't be a coinflip!" yeah I fucking know you doofus keep up with the times. also you neglected to mention victory star would increase the accuracy too get destroyed`,
            `I swim with my shorts on because I am embarrassed at how big my dick is`,
            `i also like funneling bees into my urethra`,
            `I pooped of`,
            `I bet that will even some stevens for sure`,
            `Shut up arby’s person`,
            `listen I'm tryna hang out with your parents`,
            `If I have to explain why DK’s utilt isn’t useful one more time I’m gonna chanlose it`,
            `But in 2020 if you’re out here asking why more Ness players don’t use the Super Yo-Yo glitch, shut the fuck up`,
            `darsh equates being in a rhetorical position to criticize all characters above his on the tierlist to having fun`,
            `we should stop calling him crazy hand and start calling him bipolar personality disorder hand :thumbsup:`,
            `lmao @ the idea of silver dumping a woman because she sent him the verbalase beatbox video`,
            `Had dreams… Two of ’em. Both had spotw in ’em. It’s peculiar. I’m older now then he ever was by twenty years. So, in a sense, he’s the younger man. Anyway, the first one I don’t remember too well but, it was about meetin’ him in town somewheres and he give me some money. I think I lost it. The second one, it was like we was both back in older times and I was on horseback goin’ through the mountains of a night. Goin’ through this pass in the mountains. It was cold and there was snow on the ground and he rode past me and kept on goin’. Never said nothin’ goin’ by – just rode on past. And he had his blanket wrapped around him and his head down. When spotw rode past, I seen he was carryin’ fire in a horn the way people used to do, and I-I could see the horn from the light inside of it – about the color of the moon. And in the dream I knew that he was goin’ on ahead and he was fixin’ to make a fire somewhere out there in all that dark and all that cold. And I knew that whenever I got there, he’d be there. And then I woke up.`,
            `saturday night and we in the (pedro) spot`,
            `Also very well equipped to handle the pandemic. If your state's govt bans indoor gatherings of more than 5 people, then PM can still run majors`,
            `marth is the most honest character in the game`,
            `i simply did not need to\ni was outplaying him in other areas enough that edgeguards were unnecessary`,
            `people wanna see the breast...not the best`,
            `idiosyncratic more like idiot sin crayon lole`,
            `poooooooooooooooooooooooooooooooooooooooooooooooooOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
            `First she breaks your immersion then she breaks your penis`,
            `this edible is not aint shit`,
            `Oh gonna fix your sleep schedule?\nAre you also gonna buy a bra for your breasts? You woman?`,
            `i hope my grandchildren live to see timcord crews finally finish`,
            `I think about wobbling a lot like I think about landlords\nMaybe they can serve some purpose in society, but if you want to be one you’re a wack fucking person at best`,
            `im just gonna say that quoting someone is basically an auditory screenshot and should thus be banned`,
            `The issue is that it's new and it scares me`,
            `i'm trying to imagine some 34 year old dk main sitting down at my setup that i've been playing on with my homie only to ask for bo3s, then he pulls out a flip phone from 2004 and starts tapping out an email on it`,
            `I asked druggedfox how to effectively utilize Ganon's CCing potential against Sheik and he broke out in a cold sweat mumbling about how I needed to look at the screen.`,
            `My GF felt fat so I started showing her dugong to cheer her up. They are wonderful`,
            `if you made it into just a light aerosol that happened to be on some thicc ass I might accidentally eat it while eating that ass`,
            `im pretty sure streamos goal with every reddit post is to piss specifically me off`,
            `Lmao you intel’s think she’s hit`,
            `my girlfriend looks like that and she sucked my penis today`,
            `"I AM ALL THE GOAT"\n"im sugden"`,
            `when the masseuse says "let me get the oil" cael already has`,
            `Shit shit: Shitshit the shit Shits Shitty Shit`,
            `Trump be like:\nThe Chinese's like a melody in my head\nThat I can't keep out\nI'm banning tiktok like\nNa na na na everyday\nFuck the Chinese and DPRK, RK-ay-ay-ay`,
            `So i had this dream where everyone on timcord lived on and ran this farm together and darsh would play slap bass and guitar around the campfire while we told stories and sang about the sceneries. We even had our own chicken coop, and for some reason, al and sug would always cook together, supper was the last and most important meal, and that's another thing; we ate four meals a day! Bacon and eggs every morning for breakfast cuz brio would hunt boars with a sword called the excalibur even though it was like a katana`,
            `A tier is B tier.\nSame diff.`,
            `some japes are best left unjungled`,
            `i think its fun cus i think of it as my character's fart propelling my character forward`,
            `Jaw drops to the floor, eyes extend at a velocity never before seen, I take out a boxing glove and hit myself with it 17 times, pant like a dog, and yell AOOOGA AOOOGA then turn to the audience and say in 1930s New York accent “HOT MAMA, now that’s a dame!”`,
            `Mother give me milk. Mother give me rice. Mother give me water, milk, and rice. Mother, for a long and hard life.`,
            `Fuuuuck that was such a good metaphor my nipples are fully hard rn`,
            `all i know about darsh is that he likes working out, ganon, falcon, abby, get up attacking, and he disliked fox falco sheik`,
            `when i was a kid i thought pennsylvania was pencilvania and the whole state was made entirely of pencils`,
            `"Fox...is better...cum"`,
            `even good boys stray from god`,
            `Ballin on you with the pick and roll\nYoung and gay, he in psycho mode`,
            `cael randomly messaged me on steam today to say "xringe"`,
            `Brawl 2 and Brawl 3 intentionally do away with the rough, masculine aesthetics of Melee in order to appeal to a wider and younger audience. The chance of being groomed as a minor at a Melee local is slimmer than being diddled by a Cloud player. In this way, Nintendo has deliberately contributed to the feminisation of common Asian media created for consumption and`,
            `I play the piano, drums, guitar, play chess, and I exercise everyday. I read the Bible. Personally, when I play a video game, I don’t want to deal with lame, boring characters. While you play a more aggressive doc, I will kindly ask you to reconsider your character choice.`,
            `Ate the leann chin now my poop go bad`,
            `eating so i can poop so i can eat so i can poop so i can eat so i can poop so i can eat`,
            `iwish i was asnake with a gatling gun tail`,
            `thanks karen. it looks like we have a category 2 stream moment building up in #melee-salt. we expect it to hit land sometime in the next 10-15 minutes, where our models predict it will have grown to a devastating category 4 stream moment. local shiteorologists have suggested either sheltering in place, or in some instances, evacuating. this has been farmstink with channel 69 news. stay safe everyone`,
            `Whenever i see streamo is typing a message i start to hear geiger counter noises in my head`,
            `poop onion is a much less specific idea or concept than modulo yomi levels`,
            `bjart from the top ropes\nor the top of the deku tree, i guess`,
            `why would you play undertale pregnancy dot tar dot gz when you can play melty`,
            `Some people are skinny in a creepy way`,
            `a haiku:\n\nTruly a delight\nTo see the Popoga line\nPass through our TimCord.`,
            `what else would we do with our money if not ruin the economy`,
            `Have you ever nut so hard, that communism fixed the economy?`,
            `Lick had nothing to do with it.`,
            `stop fucking lying you gay retard`,
            `Ill play if you go Ganon. Let me go get my water and good pants on`,
            `there's no argument, only streamomentum`,
            `kill all italians mama mia`,
            `anime fans be like: you're going to want to watch the first episode, watch episode 237, then watch the last one. The rest are bad. The story is really good though`,
            `If the abstract concept of peaking in high school were a melee character, that character would be ganon`,
            `stream mother is a man of honesty and integrity but only when he says stuff i agree with`,
            `dang ol’... talkinboutraceisdangolcomplicateditellyouhwatseemspretty... dang ol’... simpletomeitellyouhwat`,
            `Draco's fox is less real than his tulpa`,
            `Half the plot of the fast and furious moves is one titty and`,
            `I think streamo's just racist\nIf the bars were white instead of black I guarantee you this argument never happens\n"How am I supposed to explain to my children that urban bars are cropping my precious 4:3 display?" -streamo`,
            `Tempted to create an instagram and become a booty blasting influencer.`,
            `O, Klongposter! How thy sprawling sentences mold o'er thy brain,`,
            `Casually beating up my friends is the only reason I touch my brass knuckles at this point`,
            `do I suck cag dry again?\nHmmmmm`,
            `risc will sucx you dry like the prostitute gambler he is`,
            `humble AND powerful? god I wanna suck his cock`,
            `The flex of darsh, the finesse of soap, and the bless of coffee. By mastering these three keys of enlightenment, you can become the sickest melee player on tc`,
            `regarding breakfast tacos:\n\nrecently i learned you could make breakfast sandwiches out of bagels. Bewildered, you might ask "But how, cagliostro?"\napparently when you put breakfast food like eggs and bacon inside of a bagel it is an appropriate vehicle for it. I, as a cream-cheese-maybe-lox-and-tomatoes traditionalist, was afraid of such a wild crossover episode of a breakfast food.\nbut then I realized. a bagel is just another kind of tortilla. just as a tortilla becomes a breakfast taco when you put breakfast foods in them (almost reflexive really), bagels metamorphosize much the same. hopefully you breakfast taco deniers can now see how putting eggs and bacon into a tortilla FUNDAMENTALLY alters the taco into a breakfast food. these bagels, these tortillas, are naught but vessels for the meal you so choose. I will forever condemn dessert bagels though fuck cinnamon raisin we out.`,
            `Hummina hummina hummina AWOOGA eyes pop out tongue rolls out of mouth WOOP WOOP WOOP arf arf arf NOW THATS A DAME whistles i pant i pant and when you cant conrol it anymore i AWOOGA i drop to the the floor give 20 pushups and i have given obama the AWOOGA ALBUME SINK CUM AWOOGA KANYE WEST AWOOGA SINK POOP A girl... AND a gamer? Whoa mama! Hummina hummina hummina bazooooooiiiing! eyes pop out AROOOOOOGA! jaw drops tongue rolls out WOOF WOOF WOOF WOOF WOOF tongue bursts out of the outh uncontrollably leaking face WURLWRULWRLB tiny cupid shoots an arrow through heart Ahhhhhhhh my lady... heart in the shape of a heart starts beating so hard you can see it through shirt ba-b *jaw drops to the floor, eyes pop out of sockets accompanied by trumpets, heart beats out of chest, AWOOGA AWOOGA sound effect, pulls chain on train whistle that has appeared next to head as steam blows out, slam fist on table, rattling any plates, bowls or silverware, whistles loudly, fireworks shoot from top of head, pants loudly as tongue hangs out of mouth, wipes comically large bead of sweat from forehead, clears throat, straightens tie, combs hair Ahem, u look very lovely....`,
            `uknow i kinda want a pet monkey now so that when it grows up and eventually rips me in half with its tard power i will die the coolest way possible`,
            `i miss hitting other people with sticks mannn`,
            `deathroll is actually a fantastic life lesson`,
            `*under breath* cute AND good at deathroll? this kids got something going on.....`,
            `What, you don’t make lobster thermidor on a Tuesday morning at 5:45am? Get a third job, Chandy`,
            `I remember the version with the gay drake part on guitar hero`,
            `Why did anyone have sex on GoT?\nWhy does anyone have sex in real life?\nMoney.`,
            `dude there was only one scene that showed actual incest with penetration i think`,
            `"danerys is a slay queen and she was right to burn that one place or whatever" -farmstink`,
            `yall ever crab on the toilet\nhits different`,
            `really all we do on this discord is project gamma rays of autism at each other`,
            `no im not a lizard. why do you ask`,
            `the only matchmaking you need is slippi unranked`,
            `honestly just play the game`,
            `i remember taking a massive shit that tore my asshole, then putting a bandaid on my anus and leaving chuggaaconroys emerald playthrough where his vigaroth evolves`,
            `when i see a hot dude and don't feel anything for them sexually i feel like im doing something wrong`,
            `why do you need help with hamburgers?\nare you retarded?`,
            `Can you imagine how much better my life would be if I had taken one game off of Tafo's sheik, lost the next game to Tafo's sheik, and then took the next game against Tafo's Fox after he inexplicably switched?`,
            `speaking of live octopus in womans vagina i saw a very intriguing webm the other day`,
            `Streamo would be hilarious if he was a bot command`,
            `I wish I had a gun, so I can shoot the moth... Cus I don't want to hurt it`,
            `Im babyman. Im cool guy. Im shit head. Im poostink. Im bug killer. Im hand winner. Im fuck giver Im you.`,
            `oh no i hdeva compefsiong`,
            `Two words: vinegar enemas.`,
            `"I'm [...] gay people, I [...] like them. I'm a homo[...]." - Darsh`,
            `because ist like soulsbornenie ing oudobu ]`,
            `cover letters are the employment equivalent of boku no hero academia`,
            `when i dont want to play someone in bracket at that moment i get on the floor and clutch my shin and roll around`,
            `Imagine listening to anyone who isn’t animelover or Farmstink`,
            `Fox is so easy and lazy that his dad (James), literally just named him after his species.`,
            `8:punch:=====D\n\n8=:punch:====D\n\n8==:punch:===D\n\n8===:punch:==D\n\n8====:punch:=D\n\n8=====:punch:D\n\n8====:punch:=D\n\n8===:punch:==D\n\n8==:punch:===D\n\n8=:punch:====D\n\n8:punch:=====D\n\n8=:punch:====D\n\n8==:punch:===D\n\n8===:punch:==D\n\n8====:punch:=D\n\n8=====:punch:D\n\n8====:punch:=D\n\n8===:punch:==D\n\n8==:punch:===D\n\n8=:punch:====D\n\n8:punch:=====D\n\n8=:punch:====D\n\n8==:punch:===D\n\n8===:punch:==D\n\n8====:punch:=D\n\n8=====:punch:D\n\n8====:punch:=D\n\n8===:punch:==D\n\n8==:punch:===D\n\n8=:punch:====D\n\n8:punch:=====D\n\n8=:punch:====D\n\n8==:punch:===D\n\n8===:punch:==D\n\n8====:punch:=D\n\n8=====:punch:D\n\n8====:punch:=D\n\n8===:punch:==D\n\n8==:punch:===D\n\n8=:punch:====D\n\n8:punch:=====D\n\n8=:punch:====D\n\n8==:punch:===D\n\n8===:punch:==D\n\n8====:punch:=D\n\n8=====:punch:D\n\n8====:punch:=D\n\n8===:punch:==D\n\n8==:punch:===D\n\n8=:punch:====D\n\n8:punch:=====D\n\n8=:punch:====D\n\n8==:punch:===D\n\n8===:punch:==D\n\n8====:punch:=D\n\n8=====:punch:D\n\n8====:punch:=D\n\n8===:punch:==D\n\n8==:punch:===D\n\n8=:punch:====D\n\n8:punch:=====D\n\n8=:punch:====D\n\n8==:punch:===D\n\n8===:punch:==D\n\n8====:punch:=D\n\n8=====:punch:D\n\n8====:punch:=D\n\n8===:punch:==D\n\n8==:punch:===D\n\n8=:punch:====D\n\n8:punch:=====D\n\n8=:punch:====D\n\n8==:punch:===D\n\n8===:punch:==D\n\n8====:punch:=D\n\n8=====:punch:D\n\n8====:punch:=D\n\n8===:punch:==D\n\n8==:punch:===D\n\n8=:punch:====D\n\n8:punch:=====D\n\n8=:punch:====D\n\n8==:punch:===D\n\n8===:punch:==D\n\n8====:punch:=D\n\n8=====:punch:D\n\n8====:punch:=D\n\n8=====:punch:D:sweat_drops::sweat_drops:`,
            `cant blame a man wanting to spend the day with their grandparents at a mcdonalds`,
            `darsh is literally the best ganon on the planet`,
            `I'm with my gf rn\nGotta watch how misogynistic I start to sound`,
            `Also: is there an app to let your phone play audio out through headphone cords?\n\nNVM`,
            `i only exist to get dabbed on by darsh`,
            `I think as I get older I hate the Japanese more and more`,
            `------ WARNING-HEALTH AND SAFETY ------\n\nBEFORE PLAYING, READ YOUR OPERATIONS\nMANUAL FOR IMPORTANT INFORMATION\nABOUT YOUR HEALTH AND SAFETY.\nAlso online at\nwww.nintendo.com/healthsafety/\n\nPress Ⓐ to continue.`,
            `yeah my dad has a nice one`,
            `reading r/kappa and they seem like they have their heads screwed on pretty straight all things considered`,
            `i main fox because i unironically think that darsh is actually correct with most of his takes about fox`,
            `hate falling thru my playstation 2`,
            `like when im playing against puff my face the whole time is <:shkrorhb:696519588678074388>`,
            `<:sug_gm:612085633514471425> + <:SunnerZ:678445679110127646> <:TimmerZ:612076039144865824> + <:sugThink:612076103443677194> + <:Popoga:648637180964634642> + <:falcoS:612079928762040321> = <:sugW:612899384895733770>`,
            `<:gog:675831685404950530> war\n<:gwup:750753918556045312> famine\n<:gegory:673650608095625280> pestilence\n<:geg:659862247702528055> death`,
            `<a:cagedane:740985925252939847>\n<:doit:612326812164423684>\n<:toem:612327049603842048>`,
            `Tell her yer a hydra so you can eat her in 8 places at once <:popogog:709232946799968316> idk something smooth and dirty`,
            `most people die when they're killed`,
            `"Legislation is different than execution" what the fuck is he talking about? this chat is full of schizophrenics`,
            `I'm down to root for hbox`,
            `being unironically retarded is still being retarded`,
            `when im old enough to go to a bar ill just say that i play pichu in melee and ill drown in pusey`,
            `find your texan name! the first letter of your first name determines your texan name:\na = racist\nb = brisket\nc = racist\nd = racist\ne = racist\nf = racist`,
            `streamo narrating the doc: so some other shit happened for like a year, then I joined and this is when it gets interesting`,
            `don't fuck me on this. I swear. I beg you. dont fuck me ont his please.`,
            `okay my ongoing addiction to retardation has drawn me back in`,
            `Being "beautiful" is a french idea that we should not uncritically accept`,
            `i wish there was a creature that would latch onto ur crotch and suck ur dick/clitoris`,
            `in a way, tetris is a dating sim`,
            `10/3/2020 - Birthday boy diary, day 8\n\nDear diary,\n\nHoly shit ! I can't believe it ! I woke up again this morning, and again it is my birthday. I know it's been this way for a full week, but for some reason it only really hit me now. A full week, and still counting.\n\nIs that normal ? Does anybody else have multiple consecutive birthdays each year ? I'm starting to feel concerned, not gonna lie. Why does my birthday last this long, and why me ? Did I one day wake up embraced by the grace of God, or am I only getting deceicved by the Devil, my limbs each a thread controlled by the Master puppeteer...\n\nBut I digress, today is a beautiful day. Blue sky and all, the sun warm and the autumn air fresh. It's saturday !!! WOOOOOO !!\n\nAlso unrelated, by yesterday my cat brought back the carcass of a pretty huge rabbit headless. I threw the carcass in the wastes after glancing at my cat eating a piece of it's disemboweled stomach. Gross af L'Ami, stick to field mouse ya cunt.\n\nAnyways, I will get on with my day ! Games are not getting beaten themselves. Later, diary...\n\nGoloche Magicien`,
            `welcher + darsh = welsh\nwelsh = from wales\nwales = united kingdom\nunited kingdom = sugden\ndarsh = sugden`,
            `Penis size literally does not matter because the female orgasm is a myth.`,
            `his name is actually loche and whenever we call him goloche we're cheering him on`,
            `its just another one of the pointless emojis thats here so people can jerk themselves off over even knowing what it is`,
            `that looks tasty\nNOT THE COCK`,
            `name one thing you're trying to get me to engage with`,
            `In reality, Jigsaw would have punished him for being a welcher. But this is funnier.`,
            `I sometimes wonder if the pleasure of pooping is similar to bottoming`,
            `Did you know? Fish reproduce by jizzing a cloud of jizz in the water, same with shitting and peeing`,
            `Sheik Lamp is the thing you rub and when the genie comes out, you wish for another one of your moves to pop your opponent up.`,
            `Struc you only post in the gamer channel, and you are a gamer, yet you dont partake in the game ?`,
            `just like coffee "isn't" the "leader" of "big" sheik`,
            `Information About My Penis :flushed:\n\nMy name is Jared, and I’m here to give you information about my penis! :blush:\n\nWhat Color Is My Penis?\n\nLOL! :joy: Glad you asked! It’s white ⚪️ with red :red_circle: dots! Sometimes it changes to purple :purple_circle: though if I rub one off too quickly...\n\nWhat Has My Penis Been Inside Of?\n\nCar Exhaust Pipe :red_car:\n\nBong :moyai:\n\nVacuum Hose :person_fencing:\n\nLoaf of Bread :bread:\n\nSon :sun_with_face:\n\nMe :orangutan:\n\nWhat Has Been IN My Penis?\n\nCoins :moneybag:\n\nPencils :dagger:\n\nSyringe :syringe:\n\nMeth Pipe :thermometer:\n\niPhone Charger :wrench:\n\nKids :thought_balloon:\n\nHow Long Is My Penis?\n\n14 Ft. Long :flushed::joy::flushed:\n\nSorry :sob: that’s all the time I have for today folks! Thanks for reading! :wink::wink::wink:`,
            `i am reading wikipedia and it seems you can have sex`,
            `yeah but if you dont know how to play the matchup it is impossible`,
            `Sexuality Test:\n\nYou gay?`,
            `The original picture of him is blurred more on the sides like that super drunk dont where im at meme`,
            `(chewing on bouillon cubes) I don't get why people waste these in soup,`,
            `we are meta cognitive enough to wipe our ass but not meta cognitive enough to resist the false temptation`,
            `Melee: Don't sleep on the kid\nUlt: Don't sleep with the kid`,
            `i will win evoland.`,
            `every day I get angrier at sheik`,
            `Lol, I probably have the highest cumulative Intelligence Quotient in this server.`,
            `uh oh\nsugden’s got his magic eraser!`,
            `poop ravioli????`,
            `I am.\nnot\njoking\nI AM BEING ERAL`,
            `1. beer\n2. clamato (beer clamato ratio should be 1:1 but its your life bro)\n3. hot sauce n shit. to taste\n4. tbsp of wooshhhehteresshichier sauce\n5. put some chamoy on the rim of ur cup\n6. put tajin on rim of cup\n7. enjoy`,
            `good thing i play pikachu and not melee so I can take a shower :slight_smile: :thumbsup:`,
            `bop bongo, he'll bop you back`,
            `Oh God No i'm getting my popingis sucked by a gay man who I am prejudiced against!`,
            `master has permitted Dobby to cum <:popperga:659868423551189012>`,
            `Yeah bubbles has PTSD. Pretty Terrific Schmoovment with Doc.`,
            `THE GIFYCAT MOMENT WITH THE DOMESTIC VIOLENCE`,
            `cooking is looking up a recipe and trying not to break things because the dumb bitch who wrote the artivle wont stop talking about her husband`,
            `i do accapella versions of osts so that i can replace the game files with my own voice`,
            `To Whom It May Concern,\n\nDo you consider this pithy offering a "job offer?" Do you know who I am, what price I can demand? Do you intend to be insulting or is it just a byproduct of you incompetence. I write to you to inform you of my formal rejection of your job offer, but I bristle at the characterization of this position as a job. One could find more value in a blow job or a hand job. Fuck you,\n\nLoscar\n\nPs. Play my link, scrub`,
            `im glad i can count on 1 person being stupid a day to help me procrastinate`,
            `overclocked my dick so i can cum at 1000hz`,
            `I didn't though! I've never written anything`,
            `and really, peach is just ganon for people who are comfortable with their sexuality`,
            `talking about league? now i see why this channel is called shithead avenue`,
            `she says "shut the fuck up calliostro"`,
            `gn to,asdom`,
            `idk if id live naked all the time that'd be weird cus id love to live in a pent house in a room with a view so like if i do that people will ocasionally see me naked and call the cops and then what`,
            `there are many things i could do with an empty slot as well`,
            `Seems like heart surgeon only has one job (fixing hearts), bagger has to deal with customer service, be on his feet for hours on end, and have good mechanical/organizational skills`,
            `Farmstink doesn't stink anymore, he's washed.`,
            `apm = skill yes`,
            `i am a mechanical sex lord made by the gods above i am in full throttle horny 24/7`,
            `falco players eat the dirt in the cracks ofntheir controllers`,
            `sheik mains are all named things like bunklo or stinklo or glop or primp`,
            `why does it have music from those "satisfying shredding a giant rubbber penis" videos?`,
            `lmao\nmomomomomomomamamamaaoaoaoaoaoa`,
            `"yes im the best. no i wont play."\noh my god\ndarsh is druggedfox`,
            `Darsh still queasy that I beat him in the cum champ\nIt was easy, sent him packing like a dumb stamp\nNow he goes ahead and claims that his rhymes are superior\nBut I know he photoshopped that pic of his posterior`,
            `hentai is not cringe`,
            `notice how 5/10 of the top tc leaders are big sheik or big sheik sympathizers?`,
            `wait so they is wait not so wait so the song playlist wait so today`,
            `i hope it says something like\nLIVE\nLAUGH\nLOVE\nPIKACHU`,
            `Good to know that Franco and his household serve the lord`,
            `airplane do u know of any characters besides falcon that can pillar sheik?\ni think doc can\ncus when u see sheik\nyou pill her`,
            `it's ben a whiel an dim drunk`,
            `Twitch Chat is the Roman Coliseum but every single tomato thrown is legible`,
            `I would never murder someone again`,
            `FUCK YOU for being LONELY, rot in the HUMAN CONDITION, buy WERTHERS CARAMELS`,
            `Big falcon is living in Ga Ga I shit my pants land`,
            `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">welp<br><br>time to look into this<br><br>least I&#39;m only C tier lag :&#39;) <a href="https://t.co/mQvZ6Vmn5j%22%3Epic.twitter.com/mQvZ6Vmn5j</a></p>&mdash; PG | iBDW (Cody Schwab) (@iBDWSSBM) <a href="https://twitter.com/iBDWSSBM/status/1322244475759054850?ref_src=twsrc%5Etfw%22%3EOctober 30, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
            `Top choices so far are:\n\nKing Kandy\n\nBobingy\n\nSugden\n\nNigga Ballsack (2019) كيس الكرة :arrow_down: HD movie torrent download :arrow_down: nigga.ballsack.2019.240p.BluRay.x264.exe :heavy_check_mark: HALAL 100% :x: No virrus :heart_eyes: :v: :shield: Anti haram protection :shield: download india punjabi movies for free no viruالهند البنجاب`,
            `i am non toxic. you could put me into dog toys or spoons`,
            `zoomers be like: i am a mazda automobile`,
            `im doing a sex test on cag`,
            `Every time sheik explodes a small part of darsh's heart hopes she won't return`,
            `donarudu turumpo....`,
            `wowzy peach hack?????? invisible turnips 200% downsmash negative lag fc aerials 我的天啊 (aiplane turbo boost)`,
            `anyone else notice how the two presidential candidates are essentially opposites in a way that resembles night and day`,
            `Login to Disney plus and see that my parents are watching episode 9 again`,
            `But I might have just made an uzbeki cry during HoN`,
            `mew2king looks like he writes policy that destroys and disenfranchises black people but has a hot black wife`,
            `and i thought "dang maybe my aversion to rotting flesh and zombies is clouding my reason and making me not choose the morally correct option"`,
            `bubble wrap\n||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||||pop||||pop||||pop||`,
            `also just had a fun dream where a random middle aged lady asked me who bombsoldier is`,
            `midnights paper was about making a perpetual motion machine powered by leagu inting`,
            `either I had no idea what seaweed smelled like, or this pot smells nothing like normal seaweed`,
            `there was a presentation and the guy was like "does anyone wanna unmute and tell me what happened on this date" and the date was nov 3 2020 and I unmuted and said the first covid case and then there was dead silence for like  a minute`,
            `lmao calling them by their names\ni didnt know this girls name til like\nthe 3cnd time we met up\nnames are optional`,
            `I hate when I'm laying in bed on my back and I drop my phone on my face`,
            `Whys everyone asian now`,
            `Playing coffee is funny because I can always tell when he doesn't want to play because he picks sheik and shino stalls for 2 minutes and then goes "ggs wasnt feeling it" and then 20 minutes later calls a sheik clip lame`,
            `They say that you eat with your eyes first.\nOn my diet, I only eat with my eyes.\nI've learned that none streams are a buffet of sustenance.`,
            `star trek is the twighlight zone of star wars`,
            `If you deliberately sabotage my band, I will fuck you like a pig.`,
            `lmao silver sitting watching the godfather "fuck man. thats me right there. im da fuckin boss"`,
            `You can't star a bot message, you dunce\nYou can't star a bot message, you dunce\nYou can't star a bot message, you dunce\nYou can't star a bot message, you dunce\nYou can't star a bot message, you dunce\nYou can't star a bot message, you dunce`,
            `I feel raw, like an uncooked patty`,
            `I think I have solved peach/kirby`,
            `I think I have solved world fullness`];

        if (command === `NEWQUOTE` || command === `NEWQ` || command === `NQ`) {
            var min = (quotes.length - 105); //default 100
            var max = quotes.length;
            var r = Math.floor(Math.random() * (max - min + 1)) + min;
        } else {
            var r = Math.floor((Math.random() * quotes.length));
        }

        message.channel.send(quotes[r]);
    }

    //Crab
    if (command === `CRAB` || command === `CRABE` || command === `PRESENT` || command === `GIFT`/*|| command === `TURKEY`*//*|| command === `PUMPKIN`*/) {
        var daily = await eco.Daily(sender.id);

        if (daily.updated) {
            /*var c = [`the crab hits your face`,
                    `the crab hits your face`,
                    `the crab grabs onto your arm and pinches it as it flies by`,
                    `the crab grabs onto your arm and pinches it as it flies by`,
                    `the crab falling single hit uairs you`,
                    `the crab falling single hit uairs you`,
                    `the crab narrowly misses you`,
                    `the crab narrowly misses you`,
                    `the crab sails over your head`,
                    `the crab sails over your head`,
                    `the crab misses the l-cancel on his bair and you punish with upsmash`,
                    `the crab misses the l-cancel on his bair and you punish with upsmash`,
                    `you are not a puff main and your superior reflexes allow you to catch the crab`,
                    `you are not a puff main and your superior reflexes allow you to catch the crab`,
                    `the crab reverse fadeback fairs you`,
                    `you use your copious amount of tech skill practice to jc crab and escape`];*/

            //Halloween
            /*var c = [`the pumpkin smashes on your face and leaves you covered in pumpkin goop`,
                    `the pumpkin smashes on your face, you smell like pumpkin for a week`,
                    `the pumpkin knocks you out cold and you don't wake up until Halloween`,
                    `the pumpkin knocks you out cold and you don't wake up until Halloween`,
                    `the round, pink pumpkin back airs you`,
                    `the pumpkin falling single hit uairs you`,
                    `the pumpkin narrowly misses you`,
                    `you barely manage to dodge the pumpkin`,
                    `the pumpkin sails over your head`,
                    `the pumpkin sails over your head, hitting an innocent bystander`,
                    `the pumpkin misses its l-cancel and you punish with upsmash`,
                    `you hit the pumpkin out of the air just before it reaches you`,
                    `you are not a puff main and your superior reflexes allow you to catch the pumpkin`,
                    `you are not a puff main and your superior reflexes allow you to catch the pumpkin`,
                    `the pumpkin reverse fadeback fairs you`,
                    `the pumpkin lands on your head, giving you a free Halloween costume`];*/

            //Thanksgiving
            /*var c = [`the turkey smashes on your face and leaves you covered in stuffing`,
                    `the turkey smashes on your face, you smell like gravy for a week`,
                    `the turkey knocks you out cold and you miss the treaty signing`,
                    `the turkey knocks you out cold and you miss the treaty signing`,
                    `the turkey dairs you into the blast zone`,
                    `the turkey falling single hit upairs you`,
                    `the turkey narrowly misses you`,
                    `the turkey sails over your head`,
                    `you barely manage to dodge the turkey`,
                    `the turkey sails over your head, hitting an innocent pilgrim`,
                    `the turkey misses its L-cancel and you punish with upsmash`,
                    `you hit the turkey out of the air as it tries to double laser from ledge`,
                    `you are not a puff main and your superior reflexes allow you to catch the turkey`,
                    `you are not a puff main and your superior reflexes allow you to catch the turkey`,
                    `the turkey double shines you off the top`,
                    `the turkey lands in your cornucopia, giving you a free thanksgiving dinner`];*/

            //Christmas
            var c = [`you flub frame-perfectly opening the present and receive chronic hand pain`,
                    `you flub frame-perfectly opening the present and receive chronic hand pain`,
                    `you open the present and receive a signed headshot of Hbox`,
                    `you open the present and receive a brand new copy of Super Smash Bros. for Wii U`,
                    `you open the present and receive a pair of socks, three sizes too small`,
                    `your grandma hands you an assortment of office supplies - she didn't wrap them, she knew you wouldn't mind`,
                    `you open the present and receive a Rick and Morty controller shell`,
                    `you open the present and receive a MadCatz Wavebird`,
                    `you open the present and receive two sticks of deodorant - enough to last a lifetime`,
                    `you open the present and receive a mango-mint Juul`,
                    `you open the present and receive a copy of The Inner Game of Tennis`,
                    `you open the present and receive a copy of The Inner Game of Tennis`,
                    `you open the present and receive a signed copy of Hugo's "How to pick up women (that are taller than you)"`,
                    `you open the present and receive a new gamecube controller with all the notches`,
                    `you open the present and receive a sweater made with love in every stitch`,
                    `you open the present and receive a brand new gamecube! something is rattling on the inside...you open it up and find a giant wad of cash! and buried in that wad of cash is a brand new N64!`];

            var r = Math.floor((Math.random() * c.length));

            message.channel.send(c[r]);

            var reward = 0;

            if (r < 2) {
                reward = 10;
            } else if (r >= 2 && r < 4) {
                reward = 20;
            } else if (r >= 4 && r < 6) {
                reward = 30;
            } else if (r >= 6 && r < 8) {
                reward = 45;
            } else if (r >= 8 && r < 10) {
                reward = 55;
            } else if (r >= 10 && r < 12) {
                reward = 65;
            } else if (r >= 12 && r < 14) {
                reward = 75;
            } else if (r >= 14 && r < 15) {
                reward = 90;
            } else if (r >= 15 && r < 16) {
                reward = 100;
            }

            //DOUBLE DOUBLE
            reward = reward * 2;

            var results = await eco.AddToBalance(sender.id, reward);
            await ecolvl.SetXp(sender.id, 1);
            await ecolvl.SetLevel(sender.id, results.newbalance);

            if (r > 5) {
                const embed = new Discord.RichEmbed()
                    .setTitle(`Congratulations! You won ${reward} ${currencyName}`)
                    .setColor(0xF1C40F)
                    .addField(`${currencyName}`, `${results.newbalance}`, true)
                message.channel.send({embed});
            } else {
                const embed = new Discord.RichEmbed()
                    .setTitle(`Congratulations..? You won ${reward} ${currencyName}`)
                    .setColor(0xF1C40F)
                    .addField(`${currencyName}`, `${results.newbalance}`, true)
                message.channel.send({embed});
            }

            var d = new Date();

            if(d.getDay() == 5) {
                var r2 = Math.floor((Math.random() * c.length));

                message.channel.send(`It's double crab friday!\n`+c[r2]);

                var reward = 0;

                if (r2 < 2) {
                    reward = 10;
                } else if (r2 >= 2 && r2 < 4) {
                    reward = 20;
                } else if (r2 >= 4 && r2 < 6) {
                    reward = 30;
                } else if (r2 >= 6 && r2 < 8) {
                    reward = 45;
                } else if (r2 >= 8 && r2 < 10) {
                    reward = 55;
                } else if (r2 >= 10 && r2 < 12) {
                    reward = 65;
                } else if (r2 >= 12 && r2 < 14) {
                    reward = 75;
                } else if (r2 >= 14 && r2 < 15) {
                    reward = 90;
                } else if (r2 >= 15 && r2 < 16) {
                    reward = 100;
                }

                //DOUBLE DOUBLE
                reward = reward * 2;

                var results = await eco.AddToBalance(sender.id, reward);
                await ecolvl.SetXp(sender.id, 1);
                await ecolvl.SetLevel(sender.id, results.newbalance);

                if (r > 5) {
                    const embed = new Discord.RichEmbed()
                        .setTitle(`Congratulations! You won ${reward} ${currencyName}`)
                        .setColor(0xF1C40F)
                        .addField(`${currencyName}`, `${results.newbalance}`, true)
                    message.channel.send({embed});
                } else {
                    const embed = new Discord.RichEmbed()
                        .setTitle(`Congratulations..? You won ${reward} ${currencyName}`)
                        .setColor(0xF1C40F)
                        .addField(`${currencyName}`, `${results.newbalance}`, true)
                    message.channel.send({embed});
                }
            }
        } else {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: already completed')
                .setDescription('This command can be used once per day, you have ' + daily.timetowait + ' remaining.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }
    }



    //Pre-Crab
    if (command === `PRECRAB`) {
        var c = [`the crab hits your face`,
                `the crab hits your face`,
                `the crab grabs onto your arm and pinches it as it flies by`,
                `the crab grabs onto your arm and pinches it as it flies by`,
                `the crab falling single hit uairs you`,
                `the crab falling single hit uairs you`,
                `the crab narrowly misses you`,
                `the crab narrowly misses you`,
                `the crab sails over your head`,
                `the crab sails over your head`,
                `the crab misses the l-cancel on his bair and you punish with upsmash`,
                `the crab misses the l-cancel on his bair and you punish with upsmash`,
                `you are not a puff main and your superior reflexes allow you to catch the crab`,
                `you are not a puff main and your superior reflexes allow you to catch the crab`,
                `the crab reverse fadeback fairs you`,
                `you use your copious amount of tech skill practice to jc crab and escape`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    }

    //Calendar
    if (command === `CALENDAR` || command === `HOLIDAY` || command === `HOLIDAYS` || command === `CAL`) {
        if (args[0] && args[0] != '') {
            if (args[0] == 'JANUARY' || args[0] == 'JAN' || args[0] == 1) {
                var m = 0;
            } else if (args[0] == 'FEBRUARY' || args[0] == 'FEB' || args[0] == 2) {
                var m = 1;
            } else if (args[0] == 'MARCH' || args[0] == 'MAR' || args[0] == 3) {
                var m = 2;
            } else if (args[0] == 'APRIL' || args[0] == 'APR' || args[0] == 4) {
                var m = 3;
            } else if (args[0] == 'MAY' || args[0] == 'MAY' || args[0] == 5) {
                var m = 4;
            } else if (args[0] == 'JUNE' || args[0] == 'JUN' || args[0] == 6) {
                var m = 5;
            } else if (args[0] == 'JULY' || args[0] == 'JUL' || args[0] == 7) {
                var m = 6;
            } else if (args[0] == 'AUGUST' || args[0] == 'AUG' || args[0] == 8) {
                var m = 7;
            } else if (args[0] == 'SEPTEMBER' || args[0] == 'SEPT' || args[0] == 'SEP' || args[0] == 9) {
                var m = 8;
            } else if (args[0] == 'OCTOBER' || args[0] == 'OCT' || args[0] == 10) {
                var m = 9;
            } else if (args[0] == 'NOVEMBER' || args[0] == 'NOV' || args[0] == 11) {
                var m = 10;
            } else if (args[0] == 'DECEMBER' || args[0] == 'DEC' || args[0] == 12) {
                var m = 11;
            } else {
                var d = new Date();
                var m = d.getMonth();
            }
        } else {
            var d = new Date();
            var m = d.getMonth();
        }

        if (m === 0) {
            var embed = new Discord.RichEmbed()
                .setTitle(`January Calendar`)
                .setColor(0xafeeec)
                .addField('1/02', `Risc's Birthday`, true)
                .addField('1/09', `Cagliostro's Birthday`, true)
                .addField('1/09', `Cuck Daddy's Birthday`, true)
                .addField('1/10', `Silverhand's Birthday`, true)
                .addField('1/17', `TISHD`, true)
                .addField('1/27', `Stream Mommy Agreed with Someone`, true)
            message.channel.send({embed});
        } else if (m === 1) {
            var embed = new Discord.RichEmbed()
                .setTitle(`February Calendar`)
                .setColor(0xe46263)
                .addField('2/02', `SubjectiveF's Birthday`, true)
                .addField('2/04', `Creation Day`, true)
                .addField('2/10', `Cool Mario Screenshot`, true)
                .addField('2/17', `Sugden gets 69696 messages`, true)
                .addField('2/20', `FUCK YOU. Day`, true)
                .addField('2/24', `Sugden's Birthday`, true)
                .addField('2/26', `ADLP's Birthday`, true)
            message.channel.send({embed});
        } else if (m === 2) {
            var embed = new Discord.RichEmbed()
                .setTitle(`March Calendar`)
                .setColor(0x33bb46)
                .addField('3/07', `Stream Mommy had a good take`, true)
                .addField('3/21', `Meinkraft Day`, true)
                .addField('3/26', `The Great Wormpocalypse`, true)
                .addField('3/27', `The Lost Tapes`, true)
                .addField('3/28', `Structuremole's Birthday`, true)
            message.channel.send({embed});
        } else if (m === 3) {
            var embed = new Discord.RichEmbed()
                .setTitle(`April Calendar`)
                .setColor(0x46ff00)
                .addField('4/01', `Ted vs Cael`, true)
                .addField('4/01', `The_DDT was Created`, true)
                .addField('4/12', `Birth of Goiter`, true)
                .addField('4/13', `Creation of TedMT`, true)
                .addField('4/13', `Winnarly's Birthday`, true)
                .addField('4/21', `Crab Day`, true)
                .addField('4/22', `Chandy Blasts In`, true)
                .addField('4/26', `Fuck GG Day`, true)
                .addField('4/28', `Dimi's Birthday`, true)
                .addField('4/29', `Brio's Birthday`, true)
            message.channel.send({embed});
        } else if (m === 4) {
            var embed = new Discord.RichEmbed()
                .setTitle(`May Calendar`)
                .setColor(0x1fade9)
                .addField('5/07', `Airplane's Birthday`, true)
                .addField('5/10', `Cum Champ Day`, true)
                .addField('5/25', `Can't Go Backwards Day`, true)
                .addField('5/29', `Hollow Knight Day`, true)
            message.channel.send({embed});
        } else if (m === 5) {
            var embed = new Discord.RichEmbed()
                .setTitle(`June Calendar`)
                .setColor(0xfffc00)
                .addField('6/01', `Biday`, true)
                .addField('6/03', `Sugden Mod Coronation Day`, true)
                .addField('6/03', `Drax's Birthday`, true)
                .addField('6/11', `Return of the DDT`, true)
                .addField('6/12', `Sugden Netplay Day`, true)
                .addField('6/15', `Skrt's Birthday`, true)
                .addField('6/24', `SPOTW Returns`, true)
                .addField('6/26', `Soap's Fake Birthday`, true)
                .addField('6/27', `Coffee's Birthday`, true)
                .addField('6/30', `FloatyApologist's Birthday`, true)
            message.channel.send({embed});
        } else if (m === 6) {
            var embed = new Discord.RichEmbed()
                .setTitle(`July Calendar`)
                .setColor(0xecc81f)
                .addField('7/04', `The Day Armada got Destroyed by Sugden`, true)
                .addField('7/06', `Streamo My B'd Antiprompt`, true)
                .addField('7/13', `Farmstink's Birthday`, true)
                .addField('7/23', `WubWubWowzy's Birthday`, true)
                .addField('7/24', `Skribbl.io Day`, true)
                .addField('7/26', `Drew's Birthday`, true)
                .addField('7/30', `Draco's Birthday`, true)
                .addField('7/31', `UCFGate`, true)
            message.channel.send({embed});
        } else if (m === 7) {
            var embed = new Discord.RichEmbed()
                .setTitle(`August Calendar`)
                .setColor(0xf398d5)
                .addField('8/03', `Bubbles' Birthday`, true)
                .addField('8/06', `Blasting of the Selfies`, true)
                .addField('8/08', `Silver Mode`, true)
                .addField('8/13', `Cael's Birthday`, true)
                .addField('8/16', `The Tedpocalypse`, true)
                .addField('8/27', `Loscar's Birthday`, true)
                .addField('8/30', `Deathroll Day`, true)
            message.channel.send({embed});
        } else if (m === 8) {
            var embed = new Discord.RichEmbed()
                .setTitle(`September Calendar`)
                .setColor(0x831ceb)
                .addField('9/06', `Merging of the Bots`, true)
                .addField('9/07', `Restingcarcass's Birthday`, true)
                .addField('9/08', `Rognut's Birthday`, true)
                .addField('9/08', `Rootnut's Birthday`, true)
                .addField('9/09', `Sugden saves the economy`, true)
                .addField('9/10', `The economy is ruined again`, true)
                .addField('9/10', `History Day`, true)
                .addField('9/11', `The crab misses you and sails into the first tower, altering western civilization forever`, true)
                .addField('9/17', `Emergence of the Civil War`, true)
                .addField('9/18', `MidnightLifter's Birthday`, true)
                .addField('9/25', `Goloche's Birthday`, true)
            message.channel.send({embed});
        } else if (m === 9) {
            var embed = new Discord.RichEmbed()
                .setTitle(`October Calendar`)
                .setColor(0xff8000)
                .addField('10/01', `First Trial: Streamo vs Darsh`, true)
                .addField('10/10', `Anti admits he was wrong`, true)
                .addField('10/12', `AnimeLover's Birthday`, true)
                .addField('10/26', `It's a 2 Halloween Weekend Year`, true)
                .addField('10/27', `Anti's Marth Intervention`, true)
                .addField('10/31', `Halloween`, true)
            message.channel.send({embed});
        } else if (m === 10) {
            var embed = new Discord.RichEmbed()
                .setTitle(`November Calendar`)
                .setColor(0xa35c28)
                .addField('11/03', `Mom found the olive oil :disappointed_relieved:`)
                .addField('11/03', `Sugden 1-Up Day`)
                .addField('11/04', `Tier List Day`, true)
                .addField('11/08', `(Water)Melongate`, true)
                .addField('11/16', `Sugden Appreciation Day`, true)
                .addField('11/18', `Anti had a good take`, true)
                .addField('11/23', `Timmy's Birthday`, true)
                .addField('11/26', `Soap's Birthday`, true)
            message.channel.send({embed});
        } else if (m === 11) {
            var embed = new Discord.RichEmbed()
                .setTitle(`December Calendar`)
                .setColor(0xfdfdfd)
                .addField('12/01', `Grotlecember Begins`, true)
                .addField('12/09', `LOTR Day`, true)
                .addField('12/17', `Measurement Day`, true)
                .addField('12/22', `Sugden Hits 50k`, true)
                .addField('12/25', `Timsmas`, true)
            message.channel.send({embed});
        }

        if (args[0] === `FULL`) { //Display all months
            //To-do
        }
    }

    if (command === `CRAN`) {
        var c = [`https://media.discordapp.net/attachments/612065359285059615/673253433029165066/1121Cranberries_SC.jpg`,
            `https://media.discordapp.net/attachments/612065359285059615/673253545302032384/cranberries-101-1296x728-feature.jpg`,
            `https://media.discordapp.net/attachments/612065359285059615/673253645747224578/46db5147c16f7648.webp`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send({file: c[r]});
    }

    if (command === `CARB`) {
        var c = [`https://cdn.discordapp.com/attachments/612058753293877274/707626121390194738/19928-3-large_0.jpg`,
            `https://cdn.discordapp.com/attachments/612058753293877274/707626147671834774/Breadsticks-1.jpg`,
            `https://cdn.discordapp.com/attachments/612058753293877274/707626469374820372/dried_spaghetti.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/707626490434551829/98877-sliced-lead_How-to-make-sourdough-bread.jpg`,
            `https://bakingamoment.com/wp-content/uploads/2020/01/IMG_7173-white-bread-2.jpg`,
            `https://www.kingarthurflour.com/sites/default/files/recipe_legacy/1496-3-large.jpg`,
            `https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Mom-s-Italian-Bread_EXPS_WRSM17_41847_D03_29_4b.jpg`,
            `https://suebeehomemaker.com/wp-content/uploads/2019/06/Chewy-French-Bread-1.jpg`,
            `https://amandascookin.com/wp-content/uploads/2009/01/italian-bread-680.jpg`,
            `https://i.imgur.com/1sq4XNn.jpg`,
            `https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/paul_hollywoods_crusty_83536_16x9.jpg`,
            `https://www.seriouseats.com/2011/06/20200419-no-knead-bread-vicky-wasik2.jpg`,
            `https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/807412df-da40-49fb-b7d3-8a1f43510387/Derivates/fb54da19-9b30-4398-9111-0c0ccdd15ad3.jpg`,
            `https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/9/17/0/FNK_Microwave-Bread_V2_H_s4x3.jpg.rend.hgtvcom.826.620.suffix/1568735601945.jpeg`,
            `https://valentinascorner.com/wp-content/uploads/2013/12/Homemade-Bread-1.jpg`,
            `https://www.gimmesomeoven.com/wp-content/uploads/2020/04/No-Knead-Bread-Recipe-4-3.jpg`,
            `https://i.pinimg.com/originals/81/c9/07/81c90728e0a5cba81b5a04da64f21e2c.jpg`,
            `https://www.simplyrecipes.com/wp-content/uploads/2007/01/Rye-Bread-LEAD-06.jpg`,
            `https://i.imgur.com/urLQsyh.png`,
            `https://www.jennycancook.com/wp-content/uploads/2016/05/faster-no-knead-bread.jpg`,
            `https://i.imgur.com/8tCwndu.png`,
            `https://dinnerthendessert.com/wp-content/uploads/2019/03/French-Bread-Rolls-3.jpg`,
            `https://images-gmi-pmc.edge-generalmills.com/15c3e73d-8bb9-4c4c-b47a-bb01a17b0dca.jpg`,
            `https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0375FC32-2896-40AF-9ACD-6E904EC7116E/Derivates/4EB8635B-A00A-4E88-9A28-E3C9BB6BEC90.jpg`,
            `https://s23991.pcdn.co/wp-content/uploads/2020/02/jim-laheys-no-knead-bread.jpg`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send({file: c[r]});
    }

    //Comic
    if (command === `COMIC` || command === `COMICS` || command === `FUNNY`) {
        var c = [`https://cdn.discordapp.com/attachments/612058753293877274/621812880983064627/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/621563099408891927/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/621561519729278988/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/621068752791797790/comic.png`,
                `https://cdn.discordapp.com/attachments/612061198288027796/621054984988917790/comic.png`,
                `https://cdn.discordapp.com/attachments/612061198288027796/621054982606815271/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/620817138076221440/comic.png`,
                `https://cdn.discordapp.com/attachments/612061198288027796/619291005065363466/comic.png`,
                `https://cdn.discordapp.com/attachments/612061640694824960/619253106651299850/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/617143559929462844/comic.png`,
                `https://cdn.discordapp.com/attachments/612061198288027796/616710771799228502/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616681351734624262/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616428140650299392/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616423882659987456/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616423676568535046/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616423543303045138/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616423369620848652/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616423311353839616/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616423109251170315/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616422819336814603/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616421716800831535/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616318135657693236/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616304961948745728/comic.png`,
                `https://cdn.discordapp.com/attachments/612061198288027796/616299012462739458/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/616284616466366484/comic.png`,
                `https://cdn.discordapp.com/attachments/615454765886996481/615513757799677952/comic.png`,
                `https://cdn.discordapp.com/attachments/612063946643472389/615243696740368415/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/614207691740413962/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/613393134143143936/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/613386094255407154/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/613111650098216990/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/613110446895136789/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/613109942987128989/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/613109280391954641/comic.png`,
                `https://cdn.discordapp.com/attachments/612086349960445952/613107723575492610/comic.png`,
                `https://cdn.discordapp.com/attachments/612061198288027796/624702166585835540/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/624665502056316930/comic.png`,
                `https://cdn.discordapp.com/attachments/612065359285059615/624658683812380692/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/623960274579226624/comic.png`,
                `https://cdn.discordapp.com/attachments/612065359285059615/624636113939726356/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/624270686717739008/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/624224377193365515/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/623943357143711744/comic.png`,
                `https://cdn.discordapp.com/attachments/612061367972790281/623603446389669897/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/623261047104733194/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/623260317346168865/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/623254857075130368/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/623184917081096213/comic.png`,
                `https://cdn.discordapp.com/attachments/612063946643472389/622955842853011497/comic.png`,
                `https://cdn.discordapp.com/attachments/612063946643472389/622895923223199795/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/622827145584050205/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/622437346884976640/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/622435775207964707/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/622249578997219359/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/622248490898030602/comic.png`,
                `https://cdn.discordapp.com/attachments/612063656036925502/613107131813462047/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/628335495176257547/comic.png`,
                `https://cdn.discordapp.com/attachments/612061198288027796/628287072855261194/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/627982032030400522/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/627981727742164992/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/627975852898123786/comic.png`,
                `https://cdn.discordapp.com/attachments/612063946643472389/627667563769233419/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/627457670919749653/comic.png`,
                `https://cdn.discordapp.com/attachments/612061766830260244/626152986913144832/comic.png`,
                `https://cdn.discordapp.com/attachments/612061766830260244/625891116092227594/comic.png`,
                `https://cdn.discordapp.com/attachments/612061766830260244/625887549352706048/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/625847339327946752/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/625796333340590100/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/625677522293489684/comic.png`,
                `https://cdn.discordapp.com/attachments/612325624203182085/625375452185362442/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/624572989014540288/comic.png`,
                `https://cdn.discordapp.com/attachments/612325624203182085/631208391414513684/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/630879406897889300/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/629357532212887562/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/629066610262671362/comic.png`,
                `https://cdn.discordapp.com/attachments/612063895082762250/628996325123424269/comic.png`,
                `https://cdn.discordapp.com/attachments/612063895082762250/628995438887960617/comic.png`,
                `https://cdn.discordapp.com/attachments/612063895082762250/628995160960794674/comic.png`,
                `https://cdn.discordapp.com/attachments/612061367972790281/628788597000110090/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/634805823431770112/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/634528665610485790/comic.png`,
                `https://cdn.discordapp.com/attachments/612063656036925502/634522935482384394/comic.png`,
                `https://cdn.discordapp.com/attachments/612063656036925502/634522849658273792/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/634289364343455745/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/633966962455740420/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/633966732641304586/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/633755357055025182/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/633670096417587221/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/633419631876374548/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/633340878152269834/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/631932710197133312/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/631932546602500109/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/631932328981037056/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/639772875146133514/comic.png`,
                `https://cdn.discordapp.com/attachments/612325624203182085/638409173477883904/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/638016672820887552/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/637349859137159198/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/637349598687395865/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/637039093179482162/comic.png`,
                `https://cdn.discordapp.com/attachments/612063895082762250/636846864808804352/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/636575942244040755/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/636564878693498920/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/636342184853110784/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/636275899796291635/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/636274574681571330/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/636274497137147904/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/636270862722400278/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/635326253397835776/comic.png`,
                `https://cdn.discordapp.com/attachments/612063656036925502/654091194279788571/comic.png`,
                `https://cdn.discordapp.com/attachments/612063656036925502/654013632937459716/comic.png`,
                `https://cdn.discordapp.com/attachments/612063946643472389/651705369005129728/comic.png`,
                `https://cdn.discordapp.com/attachments/612325624203182085/651499732077641735/comic.png`,
                `https://cdn.discordapp.com/attachments/615454765886996481/651152484345053184/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/650609738442211358/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/647218197786918943/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/647184550803275776/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/647183667914997776/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/647182603455299584/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/647154136424644636/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/645833318771720192/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/645088756784693258/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/644882474379378688/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/644725109554282506/comic.png`, //LAST FROM 1.5.1
                `https://cdn.discordapp.com/attachments/612325624203182085/668840704293994506/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/666834202548764692/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/666833140458979359/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/666148758647472150/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/663921542438060062/comic.png`,
                `https://cdn.discordapp.com/attachments/612325624203182085/663569877944238090/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/662394652951052309/comic.png`, //LAST FROM 1.6.1
                `https://cdn.discordapp.com/attachments/612058753293877274/672565894337265694/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/672560642355363846/comic.png`,
                `https://cdn.discordapp.com/attachments/612061367972790281/672204642603499540/comic.png`,
                `https://cdn.discordapp.com/attachments/612065359285059615/671191644342845440/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/658639527057031195/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/672830450741411850/comic.png`,
                `https://cdn.discordapp.com/attachments/612065359285059615/672841909517025293/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/675687243515428873/comic.png`, //LAST FROM 1.6.2
                `https://media.discordapp.net/attachments/612061367972790281/676690399527567380/comic.png`,
                `https://media.discordapp.net/attachments/612325624203182085/685629976363532310/comic.png`,
                `https://media.discordapp.net/attachments/612325624203182085/685626704051437568/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/685646086320423010/comic.png`,
                `https://media.discordapp.net/attachments/245037448378318849/687030036485636198/comic.png`,
                `https://media.discordapp.net/attachments/612065359285059615/690188265210511631/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/690573322882121748/comic.png`,
                `https://media.discordapp.net/attachments/612063895082762250/694288827904294912/comic.png`,
                `https://media.discordapp.net/attachments/612063656036925502/694374456633851974/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/694393987687120986/comic.png`,
                `https://cdn.discordapp.com/attachments/612061367972790281/694599064456528002/comic.png`,
                `https://cdn.discordapp.com/attachments/612061367972790281/694243837949771846/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/693918290921128006/comic.png`,
                `https://cdn.discordapp.com/attachments/691767856051781642/693625244916645888/comic.png`,
                `https://cdn.discordapp.com/attachments/612061640694824960/693206038429564968/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/692163844092592158/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/690960015712059408/comic.png`,
                `https://cdn.discordapp.com/attachments/612065359285059615/690951650235383859/comic.png`,
                `https://cdn.discordapp.com/attachments/612061367972790281/690685507801317416/comic.png`,
                `https://cdn.discordapp.com/attachments/612063946643472389/690685486913814638/comic.png`,
                `https://cdn.discordapp.com/attachments/612063858911346700/690634465432567858/comic.png`,
                `https://cdn.discordapp.com/attachments/612061198288027796/689681830105841675/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/689614914469363946/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/689614642972327993/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/688544437244395656/comic.png`,
                `https://cdn.discordapp.com/attachments/612061198288027796/687798105982238761/comic.png`,
                `https://cdn.discordapp.com/attachments/612063656036925502/694618588358639616/comic.png`,
                `https://cdn.discordapp.com/attachments/612063656036925502/694618690955640842/comic.png`,
                `https://cdn.discordapp.com/attachments/612065359285059615/694629484686475264/comic.png`,
                `https://media.discordapp.net/attachments/612063656036925502/687028905596682260/comic.png`,
                `https://media.discordapp.net/attachments/612063656036925502/694618588358639616/comic.png`,
                `https://media.discordapp.net/attachments/670154973505519646/694996154416365628/comic.png`,
                `https://media.discordapp.net/attachments/638438136921456640/695362540229886074/comic.png`,
                `https://media.discordapp.net/attachments/612061198288027796/695406995687342170/comic.png`,
                `https://media.discordapp.net/attachments/612061367972790281/695649710089830471/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/702609753418891344/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/696405492351631401/comic.png`,
                `https://media.discordapp.net/attachments/612063946643472389/697082434998763590/comic.png`,
                `https://media.discordapp.net/attachments/612061640694824960/697126418441568286/comic.png`,
                `https://media.discordapp.net/attachments/612061640694824960/697131189080686733/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/697612746908368946/comic.png`,
                `https://cdn.discordapp.com/attachments/612061640694824960/699402883854106674/comic.png`,
                `https://cdn.discordapp.com/attachments/612061198288027796/701901083160871083/comic.png`,
                `https://cdn.discordapp.com/attachments/612061198288027796/701979647403098225/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/702105517035618314/comic.png`,
                `https://cdn.discordapp.com/attachments/612061766830260244/702246893086048287/comic.png`,
                `https://cdn.discordapp.com/attachments/612063895082762250/702380685062701066/comic.png`,
                `https://cdn.discordapp.com/attachments/612063670297427978/702408085448425492/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/703600276027736074/comic.png`,
                `https://media.discordapp.net/attachments/612061198288027796/704177744799465475/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/704365766538952834/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/704785285266800751/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/705074357713502269/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/705859294515429496/comic.png`,
                `https://media.discordapp.net/attachments/638438136921456640/705580919779491940/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/705954130719539281/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/705998325505196053/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/706528331964743710/comic.png`,
                `https://media.discordapp.net/attachments/612325624203182085/707271517037265046/comic.png`,
                `https://media.discordapp.net/attachments/612063670297427978/707349614361051156/comic.png`,
                `https://media.discordapp.net/attachments/612061640694824960/707567086024523816/comic.png`,
                `https://media.discordapp.net/attachments/675486122759028786/707609311169478686/comic.png`,
                `https://media.discordapp.net/attachments/612061198288027796/708795289552551956/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/709115349001568336/comic.png`,
                `https://media.discordapp.net/attachments/672225366273818657/709370843628568696/comic.png`,
                `https://media.discordapp.net/attachments/672225366273818657/709370854349209690/comic-1.png`,
                `https://media.discordapp.net/attachments/612061766830260244/709921561078923415/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/709968655856959549/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/711342054021660692/comic.png`, //everything past this
                `https://cdn.discordapp.com/attachments/612058753293877274/714536814223818905/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/715348275212845066/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/715610893244956753/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/718220240349167787/comic.png`,
                `https://cdn.discordapp.com/attachments/615454765886996481/718234259688652930/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/718293878184083496/comic.png`,
                `https://cdn.discordapp.com/attachments/615454765886996481/718592172584337478/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/719559051049959475/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/719559173922095154/comic.png`,
                `https://cdn.discordapp.com/attachments/612063670297427978/722867374906277948/comic.png`,
                `https://cdn.discordapp.com/attachments/612063670297427978/722868990606704740/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/722944285837885490/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/723620212070547546/comic.png`,
                `https://cdn.discordapp.com/attachments/612325624203182085/725138124086444043/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/727023675420835970/comic.png`,
                `https://cdn.discordapp.com/attachments/612325624203182085/728042374135021668/comic.png`,
                `https://cdn.discordapp.com/attachments/612061367972790281/729717620529430528/comic.png`,
                `https://cdn.discordapp.com/attachments/612063656036925502/687028905596682260/comic.png`,
                `https://cdn.discordapp.com/attachments/612061766830260244/731640281316720700/comic.png`,
                `https://cdn.discordapp.com/attachments/612061652874952721/732436986413187132/comic.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/712706568801615872/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/758016093137797270/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/757748755226427402/comic.png`,
                `https://media.discordapp.net/attachments/612061640694824960/756697820777676930/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/754200042931486740/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/753968407757717589/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/752390131205537822/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/752340284066758676/comic.png`,
                `https://media.discordapp.net/attachments/612063858911346700/752281976597250118/comic.png`,
                `https://media.discordapp.net/attachments/612061198288027796/749811578446020681/Comic.png`,
                `https://media.discordapp.net/attachments/612063946643472389/749402514146984078/comic.png`,
                `https://media.discordapp.net/attachments/612061640694824960/748972137749938276/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/748563026566840330/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/747545303543972050/comic.png`,
                `https://media.discordapp.net/attachments/612061198288027796/747223154656673852/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/745855995124908102/comic.png`,
                `https://media.discordapp.net/attachments/612061367972790281/741088393890365460/comic.png`,
                `https://media.discordapp.net/attachments/612061367972790281/741088240768909322/comic.png`,
                `https://media.discordapp.net/attachments/632626870487220257/739844044942868520/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/737895420512174123/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/736495988729970698/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/734252145536401488/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/760871916688244756/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/762804022780231721/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/762891577860554763/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/762892324412850187/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/764796702364008458/comic.png`,
                `https://media.discordapp.net/attachments/612061198288027796/766284059231518730/comic.png`,
                `https://media.discordapp.net/attachments/691767856051781642/767942550723756032/comic.png`,
                `https://media.discordapp.net/attachments/612061198288027796/768483704975786004/comic.png`,
                `https://media.discordapp.net/attachments/612061198288027796/769248502906880041/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/771487284267974696/comic.png`,
                `https://media.discordapp.net/attachments/612061766830260244/771487478095937576/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/771964321068613632/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/772097501272211466/comic.png`,
                `https://media.discordapp.net/attachments/612063946643472389/772909731093413888/comic.png`,
                `https://media.discordapp.net/attachments/612061367972790281/773006300648701972/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/773258702533951538/comic.png`,
                `https://media.discordapp.net/attachments/612065359285059615/776805619939409950/comic.png`,
                `https://media.discordapp.net/attachments/612058753293877274/778659739558608917/comic.png`,
                `https://media.discordapp.net/attachments/612063946643472389/770712729626869801/comic.png`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send({file: c[r]});
    }

    //Chart
    if (command === `CHART`) {
        var charts = [`https://cdn.discordapp.com/attachments/612063946643472389/641603621955305482/chart.png`,
            `https://cdn.discordapp.com/attachments/612325624203182085/640978083029057536/chart.png`,
            `https://cdn.discordapp.com/attachments/612325624203182085/640978015181996032/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/639774663714668565/chart.png`,
            `https://cdn.discordapp.com/attachments/612061367972790281/638818280282259458/chart.png`,
            `https://cdn.discordapp.com/attachments/612061367972790281/638818073465323521/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/637140138883022888/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636908131603185664/chart.png`,
            `https://cdn.discordapp.com/attachments/612063858911346700/636887434046734336/chart.png`,
            `https://cdn.discordapp.com/attachments/612063895082762250/636846246950076436/chart.png`,
            `https://cdn.discordapp.com/attachments/612061652874952721/636682204411461635/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636681815679172609/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636681637064736820/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636681503224496158/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636621942308208640/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636620782566375431/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636602088255651870/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636577439476088844/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636577088706576414/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636576267776426004/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636575863554572308/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636573717547188254/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636573559879237672/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636573064393523200/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636572520543420416/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636572411591917578/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636572072516124682/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636571688129134593/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636571436735266858/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636571011248029696/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636570639591014400/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636570603448696832/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636570432052658178/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636569975955390483/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636569038771716117/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636568880348921887/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636568850606850089/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636568699465236490/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636568613662490636/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636568542724227073/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636568501410332682/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636568412935684136/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636568387358818304/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636568252000239643/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636568122333200390/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636568083409928232/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636568036660477953/chart.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/636567857936728075/chart.png`,
            `https://media.discordapp.net/attachments/612065359285059615/687031470853718021/chart.png`,
            `https://media.discordapp.net/attachments/612058753293877274/776635789597474816/chart.png`];

            var r = Math.floor((Math.random() * charts.length));

            message.channel.send({file: charts[r]});
    }

    //Costume / HalloweenDog
    /*if (command === `COSTUME` || command === `COSTUMES` || command === `COSTUMEDOG` || command === `HALLOWEENDOG` || command === `HALLOWEEN`) {
        var costumes = [`https://moneydotcomvip.files.wordpress.com/2017/10/171018-dog-halloween-costumes-raptor.jpg`,
            `https://www.telegraph.co.uk/content/dam/video_previews/r/v/rvmjg1nze6z4vd2gj6owhh9jc6xvdmhk-xxlarge.jpg`,
            `https://i.pinimg.com/originals/f3/b1/b0/f3b1b045c3e1d50b5d7f4b931165fd15.jpg`,
            `https://media.phillyvoice.com/media/images/01_102417_HalloweenDogs_Carroll.2e16d0ba.fill-735x490.jpg`,
            `https://purewows3.imgix.net/images/articles/2019_08/dog_halloween_costumes.jpg`,
            `https://i.ytimg.com/vi/hdxKJsTvvxQ/hqdefault.jpg`,
            `https://media1.popsugar-assets.com/files/thumbor/JQUUCOeO9YTIkYrVplfJchnodek/0x0:2003x2003/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/08/28/858/n/24155406/931e6e6c5d66d798a36ba9.34935958_/i/Dogs-Halloween-Costumes.jpg`,
            `https://diy.sndimg.com/content/dam/images/diy/fullset/2014/6/9/0/CI-Brian-Brainerd_bull-dog-in-ballerina-Halloween-costume_v.jpg.rend.hgtvcom.616.822.suffix/1420778852478.jpeg`,
            `https://www.simplemost.com/wp-content/uploads/2018/09/Screen-Shot-2018-09-21-at-11.37.56-AM-750x500.png`,
            `https://static01.nyt.com/images/2014/10/30/t-magazine/30viewfinder-hirsch-slide-TWGN/30viewfinder-hirsch-slide-TWGN-videoLarge.jpg`,
            `https://dogtime.com/assets/uploads/2018/09/unhappy-dogs-in-costume-2-1280x720.png`,
            `https://media1.popsugar-assets.com/files/thumbor/hIev4EBak4afdOeJGaGyuzxX-HE/248x0:1454x1206/fit-in/550x550/filters:format_auto-!!-:strip_icc-!!-/2019/09/05/937/n/1922243/4236cd385d717e527c8e79.13418759_/i/Disney-Dog-Costumes.jpg`,
            `http://trupanion.com/blog/wp-content/uploads/2017/11/edit_IMG_7241.jpg`,
            `https://www.thepubliceditor.com/wp-content/uploads/2018/09/Dogs_Scary_Halloween_Costume.jpg`,
            `https://cdn.fashionmagazine.com/wp-content/uploads/2017/10/Screen-Shot-2018-10-30-at-9.58.49-AM-480x320-c-top.png`,
            `https://i.imgur.com/JO2lNCl.jpg`,
            `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-halloween-costumes-1532555670.jpg`,
            `https://media1.popsugar-assets.com/files/thumbor/CJEtk1U6VpB75o_qxfPAX6579r0/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/10/19/826/n/1922243/a00d1cad_edit_img_image_16686166_1444860712_12142682_526874914145470_1831035987_n/i/DIY-Halloween-Costumes-Dogs.jpg`,
            `http://www.korrectkritters.com/upload/2017/11/16/fun-dogs-in-halloween-costumes-dogs-in-halloween-costumes-s-90dfed41ee1742bb.jpg`,
            `https://i.imgur.com/A5nyeDW.png`,
            `https://i.imgur.com/E3wqRQi.png`,
            `https://i.imgur.com/hruNkRh.png`,
            `https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2017/10/halloween-costumes-for-dogs-600x600.jpg`,
            `https://www.pedigreefoundation.org/wp-content/uploads/2016/10/elvis.jpg`,
            `https://s.hdnux.com/photos/67/05/73/14442226/3/920x920.jpg`,
            `https://i.pinimg.com/originals/2e/a0/cd/2ea0cd6333d77d49334fd638d8f1bc28.jpg`,
            `http://www.dogtagart.com/sites/default/files/blog/dogscostume.jpg`,
            `https://i.imgur.com/DQJjEMV.jpg`,
            `https://i.pinimg.com/originals/7e/85/d0/7e85d05973c3b487c9d45c63df55d431.jpg`,
            `https://moneydotcomvip.files.wordpress.com/2017/10/171018-dog-halloween-costumes-robin.jpg`,
            `https://s.hdnux.com/photos/04/34/32/1164953/3/920x920.jpg`,
            `https://i2.wp.com/blog.potterybarn.com/wp-content/uploads/2015/10/Screen-Shot-2015-10-12-at-4.12.06-PM1.png`,
            `https://i.imgur.com/tn7bfQv.png`,
            `https://i.imgur.com/ddFxviv.png`,
            `https://static.businessinsider.com/image/5088501f6bb3f78664000002-750.jpg`,
            `https://i.ytimg.com/vi/T0OHl7bbL1g/hqdefault.jpg`,
            `https://hips.hearstapps.com/rbk.h-cdn.co/assets/cm/14/50/548969e457d0e_-_top-paw-basketball-player-costume-for-dogslgn.gif`,
            `https://static.fabfitfun.com/magazine/wp-content/uploads/2018/10/09170644/dog.png`,
            `https://i.imgur.com/LzcvHfl.png`,
            `https://purewows3.imgix.net/images/articles/2017_09/Princess-Leia-dog-costume-for-Halloween.jpg`,
            `https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2010/7/27/0/Halloween-UGC_Foleyboy-alien-dog-costumes_s4x3.jpg.rend.hgtvcom.616.462.suffix/1400947976466.jpeg`,
            `https://www.wweek.com/resizer/b5st6q0nx-4BE81x0TdZzJ2198Y=/1200x0/filters:quality(100)/s3.amazonaws.com/arc-wordpress-client-uploads/wweek/wp-content/uploads/2017/10/26171017/Cowboy-Dog.jpg`,
            `https://media.healthday.com/Images/icimages/dog_costume1026.jpg`,
            `https://www.telegraph.co.uk/content/dam/Pets/2015-09/30oct/dogcrab.jpg`,
            `https://purewows3.imgix.net/images/articles/2017_09/Dog-dressed-up-for-Halloween-in-spider-costume.jpg`,
            `https://petcube.com/blog/content/images/2018/10/dog-pumpkin-halloween-costume.jpg`,
            `https://i.imgur.com/0UJXND1.jpg`,
            `https://cdn1-www.cattime.com/assets/uploads/gallery/cool-halloween-costumes/dog-halloween-costume-cerberus.jpg`,
            `https://costumesjoy.com/wp-content/uploads/2018/08/Dogbaby-Halloween-Costumes-Pet-Clothing-Funny-Guitar-Dog-Clothes-Pet-Puppy-Coats-For-Puppy-Dog-French.jpg`,
            `https://static-blog.fabfitfun.com/magazine/wp-content/uploads/2018/10/09164347/spider-pup-costume.png`,
            `https://i.imgur.com/djUHSvl.png`,
            `https://sitterforyourcritter.com/wp-content/uploads/2017/10/dogs-dressed-as-superheros.jpg`];

        var r = Math.floor((Math.random() * costumes.length));

        message.channel.send({file: costumes[r]});
    }*/

    //Tierlist
    if (command === `TIERLIST` || command === `TIER` || command === `TIERLISTS`) {
        var lists = [`Netplay Greetings - Bubbles\nhttps://cdn.discordapp.com/attachments/612058753293877274/641867089996414987/netplay_greeding_tier_list.png`, //0
            `Sneeze Sounds - Bubbles\nhttps://cdn.discordapp.com/attachments/612058753293877274/641864531676626954/my-image_3.png`,
            `Who I want to kiss - Anti\nhttps://cdn.discordapp.com/attachments/612058753293877274/641862043908964362/unknown.png`,
            `How nice people are to Soap - Soap\nhttps://cdn.discordapp.com/attachments/612061367972790281/641858999888904202/my-image_3.png`,
            `Drunk/Bunk Blazed/Lazed - Struc\nhttps://cdn.discordapp.com/attachments/612058753293877274/641815062373466143/unknown.png`,
            `Schwasted - AL\nhttps://cdn.discordapp.com/attachments/612058753293877274/641812280505532427/8a57e010-d6c4-4b5e-ac01-21e8eabd5612.png`, //5
            `Pepsi Drinking Vessels - Bubbles\nhttps://cdn.discordapp.com/attachments/612058753293877274/641809428030685184/where_they_drink_their_pepsi_from_tier_list.png`,
            `Stubbed Toe - Bubbles\nhttps://cdn.discordapp.com/attachments/612058753293877274/641799073665515520/my-image_2.png`,
            `Gamers - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641796630357606400/3Wy3c0zL8NU49mElvmIVidjTvK2zqGprCecRQAABBBBAAAEEEEAAAQQaBXLOjRV9Hi9hCOWiAtaMljLzj9pwAAAABJRU5ErkJggg.png`,
            `Typos - Struc\nhttps://cdn.discordapp.com/attachments/612058753293877274/641795027948929024/unknown.png`,
            `Technology - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641793787563212810/5rfWBgAAAABJRU5ErkJggg.png`, //10
            `Cag's Sex Simulation - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641788902721585173/8pkAAAAASUVORK5CYII.png`,
            `Biggest Poo - Risc\nhttps://cdn.discordapp.com/attachments/612058753293877274/641786525113384970/Screenshot_20191107-005000.png`,
            `Uh oh, stinky - AL\nhttps://cdn.discordapp.com/attachments/612058753293877274/641785058222538762/1d7c5529-9792-4684-8860-f88781497bba.png`,
            `Sex Simulation - Cag\nhttps://cdn.discordapp.com/attachments/612058753293877274/641781717178384424/my-image_3.png`,
            `Sex - Cael\nhttps://cdn.discordapp.com/attachments/612058753293877274/641783025364893727/unknown.png`, //15
            `Ease of Placement - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641770807814520883/5c555d16-dc4e-4e2e-8e82-5407ad97eff7.png`,
            `Playstyle - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641764704972308480/179f6bf9-e782-4066-b773-d0f186f14aa5.png`,
            `PeePeePooPoo - Struc\nhttps://cdn.discordapp.com/attachments/612058753293877274/641763872855818241/unknown.png`,
            `Holy Style - Rog\nhttps://cdn.discordapp.com/attachments/608818247877525526/672641875487883307/unknown.png`,
            `AntiPrompt Be Like - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641761002916020233/236836ae-676d-4f7f-b8a9-b0eecd7f74e7.png`, //20
            `Political Alignment - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641758194024316939/my-image-1.png`,
            `OGs - Drew\nhttps://cdn.discordapp.com/attachments/612058753293877274/641750141753098240/Screen_Shot_2019-11-06_at_1.25.27_PM.png`,
            `Bird Spouses - Cael\nhttps://cdn.discordapp.com/attachments/612058753293877274/641747409793187860/unknown.png`,
            `Text Chat - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641746299552530433/5c68af65-9ff3-4b46-ab2b-8ddf5f7ffc71.png`,
            `Bird Spouses - Rog\nhttps://cdn.discordapp.com/attachments/608818247877525526/672650364046147594/unknown.png`, //25
            `Bird Spouses - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641737676273352725/c19fe0e9-1569-4e68-9e78-23982f691ce5.png`,
            `Selfie Blasters - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641723955664650243/8fae1bbf-6025-4e6c-827a-4da81c7e5a5e.png`,
            `How Good People Actually are at Melee - Crowdfunded\nhttps://cdn.discordapp.com/attachments/612061766830260244/668817072054206464/a80ba2df-f00d-4322-abc2-6b10a83d49a4.png`,
            `Legs - Rog\nhttps://cdn.discordapp.com/attachments/612058753293877274/641419566458732557/20191105_183423.jpg`,
            `Cute PFPs - Rog\nhttps://cdn.discordapp.com/attachments/612058753293877274/641416615765868571/20191105_182248.jpg`, //30
            `PFPs - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641404980498268173/4f201937-4c2c-4ed7-ac6e-9ef09e2603fd.png`,
            `Deadasscord - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641403087608610847/7c9cce33-b685-494f-a7db-7df253b5efc1.png`,
            `Bowser Mentions - Rog\nhttps://cdn.discordapp.com/attachments/612058753293877274/641397758603034646/20191105_170801.jpg`,
            `-own - Rog\nhttps://cdn.discordapp.com/attachments/612058753293877274/641392103066304513/20191105_164509.jpg`,
            `Lab Chads - Rog\nhttps://cdn.discordapp.com/attachments/612058753293877274/641388716660621315/20191105_163206.jpg`, //35
            `Bits - Sugden\nhttps://cdn.discordapp.com/attachments/612058753293877274/641382217204891658/unknown.png`,
            `Deadass No Cap - Midnight\nhttps://cdn.discordapp.com/attachments/612058753293877274/641375665177755678/6D9dUogLQAAAAASUVORK5CYII.png`,
            `PFPs - Rog\nhttps://cdn.discordapp.com/attachments/612058753293877274/641367039117754389/20191105_150553.jpg`,
            `Colors - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641326925264060439/f15b6f15-6818-4170-9d60-faf74d5b3b29.png`,
            `Mafia - AL\nhttps://cdn.discordapp.com/attachments/612058753293877274/641361930371596290/my-image1.png`, //40
            `Are we Human or Robot or Dancer? - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641322737125818379/125aaa84-6453-40d5-99f8-57694dfff289.png`,
            `Wub - Wub\nhttps://cdn.discordapp.com/attachments/612058753293877274/641357842384945152/unknown.png`,
            `Magical Ability - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641351390593286154/79d2a585-d85e-4ff6-9c29-d433db38f187.png`,
            `Autism - Sugden\nhttps://cdn.discordapp.com/attachments/612058753293877274/641345266305466368/unknown.png`,
            `Cool - Sugden\nhttps://cdn.discordapp.com/attachments/612058753293877274/641340730572275732/unknown.png`, //45
            `Choccy Milk - AL\nhttps://cdn.discordapp.com/attachments/612058753293877274/641338336505495563/my-image.png`,
            `Commitment - Sugden\nhttps://cdn.discordapp.com/attachments/612058753293877274/641337986520186890/unknown.png`,
            `SPOTW - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641324792800083984/2b6ecab2-5441-4229-936d-f7c609c6916f.png`,
            `Fortnite Dancing - Coffee\nhttps://cdn.discordapp.com/attachments/612058753293877274/641320992257605652/image0.png`,
            `N Word - Dimi\nhttps://cdn.discordapp.com/attachments/612058753293877274/641315763034128404/image0.png`, //50
            `Geography - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641297437947854889/7e51f626-8b42-402d-a37e-8fecfd89aa6b.png`,
            `Mains - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641272510427693057/timcord-204703-1572961646.png`,
            `Morning People - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641264213297201172/timcord-204703-1572959676.png`,
            `Anal Ingestion - Coffee\nhttps://cdn.discordapp.com/attachments/612058753293877274/641131983032025089/image0.png`,
            `Faces - Loscar\nhttps://cdn.discordapp.com/attachments/612058753293877274/641130738393022464/unknown.png`, //55
            `Zombie Apocalypse - Coffee\nhttps://cdn.discordapp.com/attachments/608818247877525526/672629542950535200/unknown.png`,
            `Contrarians - Struc\nhttps://cdn.discordapp.com/attachments/612058753293877274/641127550667587594/unknown.png`,
            `Elements - Brio\nhttps://i.gyazo.com/thumb/1200/3f96e10572478f58dd9403ac479418d2-png.jpg`,
            `Southern Values - Midnight\nhttps://cdn.discordapp.com/attachments/612058753293877274/641124601698713601/D8xr9jAAeSqiQAAAABJRU5ErkJggg.png`,
            `Similarities - Loscar\nhttps://cdn.discordapp.com/attachments/612058753293877274/641123400563163161/5QwxAEWvxpgAAAAASUVORK5CYII.png`, //60
            `Vibe - AL\nhttps://cdn.discordapp.com/attachments/612058753293877274/641123379503562762/tierlisttoendtimcord.png`,
            `You Hate to See It - Coffee\nhttps://cdn.discordapp.com/attachments/612058753293877274/641123105103937556/image0.png`,
            `West Coast Hours - Struc\nhttps://cdn.discordapp.com/attachments/612058753293877274/641121165443858452/unknown.png`,
            `Drugs - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641113720180834324/timcord-204703-1572923806.png`,
            `Hornyness - Loscar\nhttps://cdn.discordapp.com/attachments/612058753293877274/641108965798838272/AY3XIofuKNKAAAAAElFTkSuQmCC.png`, //65
            `Gfycat - Soap\nhttps://cdn.discordapp.com/attachments/612058753293877274/641108329074262028/my-image_2.png`,
            `Fun to Combo - Midnight\nhttps://cdn.discordapp.com/attachments/612058753293877274/641106173948329994/unknown.png`,
            `Olive Oil - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641106072010096661/timcord-204703-1572921924.png`,
            `Sheik - Darsh\nhttps://cdn.discordapp.com/attachments/612058753293877274/641104968337588239/Sheik.png`,
            `Boomers and Zoomers - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641099378043650088/timcord-204703-1572920364.png`, //70
            `Emotes - Sugden\nhttps://cdn.discordapp.com/attachments/612058753293877274/641998514833981440/Sugdens_TimCord_Emote_Tier_List_09-20-19.png`,
            `Alignment Chart - Sugden\nhttps://cdn.discordapp.com/attachments/612058753293877274/641998696103411722/timcord_alignment_chart.png`,
            `Chads - Crowdfunded\nhttps://cdn.discordapp.com/attachments/612058753293877274/641998720388431910/timcord_chad_tier_list.png`,
            `Numbers - Crowdfunded\nhttps://cdn.discordapp.com/attachments/612058753293877274/641999035636514826/TimCord_Numbers_1-100_Tier_List.png`,
            `PFPs - Sugden\nhttps://cdn.discordapp.com/attachments/612058753293877274/641999192394432533/timcord_pfp_tier_list_v1.png`, //75
            `Civil War - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/641999666648711181/TimCord_Civil_War.png`,
            `EU Countries - Crowdfunded\nhttps://cdn.discordapp.com/attachments/612058753293877274/621459576897798154/9d91ca73-f02d-4971-a151-a71b3dfc2e60.png`,
            `Naruto - Crowdfunded\nhttps://cdn.discordapp.com/attachments/612058753293877274/622722561087635476/Narutocord.png`,
            `Cartoons - Sugden\nhttps://cdn.discordapp.com/attachments/555176988562948116/577644325748473892/unknown.png`,
            `Cartoons - Silver\nhttps://cdn.discordapp.com/attachments/555176988562948116/577644573577314305/9KuQTvO.png`, //80
            `Pokemon Types - Brio\nhttps://media.discordapp.net/attachments/612058753293877274/644098320884826112/Pokemontypetierlist.png`,
            `Mixtape Vol. 1&2 Album Covers - Sugden\nhttps://cdn.discordapp.com/attachments/612063858911346700/672598635019501578/Mixtape_Vol_12_Cover_Tier_List.png`,
            `Mixtape Vol. 2 - Drew\nhttps://cdn.discordapp.com/attachments/608818247877525526/672627030411706378/unknown.png`,
            `Cheesy Pictures - Silver\nhttps://cdn.discordapp.com/attachments/612063895082762250/667184766759600139/idIcyjmUdhYAAAAASUVORK5CYII.png`,
            `Official:tm: Bit Tier List - Sugden, Silver, Wub, Dimi\nhttps://cdn.discordapp.com/attachments/612058753293877274/661236924861775876/Top_50_TimCord_Bits_of_the_Decade.png`, //85
            `-oomer - Coffee\nhttps://cdn.discordapp.com/attachments/612058753293877274/660196283453276181/image0.png`,
            `Undertale OST - Sugden\nhttps://cdn.discordapp.com/attachments/612058753293877274/659100827449032734/Undertale_OST_Tier_List.png`,
            `Christmas Names - Drew\nhttps://cdn.discordapp.com/attachments/608818247877525526/672640878023540796/unknown.png`,
            `Reading Capability - Stream Mommy\nhttps://cdn.discordapp.com/attachments/611202965558132747/672641355763286016/unknown.png`,
            `Irony -> Sincerity, Top to bottom - AL\nhttps://cdn.discordapp.com/attachments/612058753293877274/648581409337770008/my-image_2.png`, //90
            `No. of Comic Appearances [OBJECTIVELY TRUE] - Sugden\nhttps://cdn.discordapp.com/attachments/612058753293877274/647178872948916283/72911bde-fcde-4c31-84fe-7fc2dc0bbf67.png`,
            `Likeliness to be IceMaster - Cael\nhttps://cdn.discordapp.com/attachments/612058753293877274/646682256081158154/my-image_4.png`,
            `Shorts in the Dark - Silver\nhttps://media.discordapp.net/attachments/612058753293877274/646369049265307661/aefdd622-307f-4ae7-a348-3343e95a642d.png`,
            `Dad/Sheik Being Lame - Silver\nhttps://media.discordapp.net/attachments/612058753293877274/646373138652987403/b50dd12a-0109-4b9f-9350-6e15877d7d59.png`,
            `What the fuck is this even supposed to be - Cael\nhttps://media.discordapp.net/attachments/612058753293877274/646147606543728640/chart_filled.png`, //95
            `NEETs - Loscar\nhttps://media.discordapp.net/attachments/612063946643472389/646060565004812298/AKmoRNf97zIIAAAAAElFTkSuQmCC.png`,
            `Grilled Cheese vs PB&J, d1-lamb vs jamz - Silver\nhttps://media.discordapp.net/attachments/612058753293877274/646066248655962133/973a286e-ef2f-496a-8f41-b5cdc1b7815e.png`,
            `Tits or Ass, Pogeyman or Digiman - Silver\nhttps://media.discordapp.net/attachments/612058753293877274/646062078804885504/2e891ddc-17ce-460e-8b4b-c8dc1ffcf6c2.png`,
            `Sugden's Really Epic Candy Tier List he got from the Candy Event - Sugden\nhttps://cdn.discordapp.com/attachments/612058753293877274/645705117731127315/Event_Candy_Tier_List.png`,
            `Commands - Sugden\nhttps://media.discordapp.net/attachments/612058753293877274/644559837052796937/Unordered_Commands_Tier_List.png`, //100
            `Likeliness to have a Child - Cael\nhttps://media.discordapp.net/attachments/612058753293877274/644511248213344256/my-image3.png`,
            //`Handsome Boys - Silver\nhttps://images-ext-2.discordapp.net/external/13iu1PMBQPT5k2fRQbRRxSqMraAx6PKwoKEnjRpHPyY/https/i.imgur.com/D0Dswha.png`,
            `Swiper - Bubbles\nhttps://cdn.discordapp.com/attachments/612058753293877274/643319365122392075/my-image_1.png`,
            `Fifth Grade Museum Field Trip - Bubbles\nhttps://cdn.discordapp.com/attachments/612058753293877274/672845218004992020/image0.png`,
            `Pooping in the Woods - Coffee\nhttps://cdn.discordapp.com/attachments/612058753293877274/672839903435816971/image0.png`, //105
            `Impossible Homework - Coffee\nhttps://cdn.discordapp.com/attachments/612058753293877274/672844424597995555/image0.png`,
            `Pizza Party - Coffee\nhttps://cdn.discordapp.com/attachments/612058753293877274/672852937185165312/image0.png`,
            `PoE Ascendancies - Silver\nhttps://cdn.discordapp.com/attachments/612063670297427978/672881039286337536/397b9419-e875-41a1-bb81-d6b346f37cf4.png`,
            `Favorite Holidays - Silver\nhttps://media.discordapp.net/attachments/612058753293877274/672899466491330562/72ef2975-15af-4335-8b2b-185dfdf93467.png`,
            `Bagel Chip - AL\nhttps://media.discordapp.net/attachments/612058753293877274/673377990234865684/Screenshot_20200201-173557.png`, //110
            `Breakfast Drinks - Silver\nhttps://media.discordapp.net/attachments/612058753293877274/674639162586038290/903313d2-b7b2-4232-84dd-627133f4ff58.png`,
            `Pre-Industrial Jobs - Silver\nhttps://media.discordapp.net/attachments/612058753293877274/674646058713874461/3c6051dc-59ad-4948-a56f-a55ca44697d3.png`,
            `Droids - Coffee\nhttps://media.discordapp.net/attachments/612058753293877274/674646485253488650/image0.png`,
            `Robot Alien Ninja Pirates - Silver\nhttps://media.discordapp.net/attachments/612058753293877274/674642153565323284/7493fd51-0eb5-453d-8012-ea55959dada0.png`,
            `When you bump into someone - Silver\nhttps://media.discordapp.net/attachments/612058753293877274/674648939596873768/36e45da2-7ebf-47d3-b1a3-55e6af81a4a7.png`, //115
            `Sandwich Meats - Coffee\nhttps://media.discordapp.net/attachments/612058753293877274/674650495930859551/image0.png`,
            `Ice - Silver\nhttps://media.discordapp.net/attachments/612058753293877274/674691080893235210/d33d69e8-7e45-4954-b86e-5ed4d14767e9.png`,
            `Sports - Silver\nhttps://media.discordapp.net/attachments/612058753293877274/674693674453434388/d3ff44d8-2513-4070-b17f-2d0925093bd4.png`,
            `McDonald's vs Wendy's - AL\nhttps://media.discordapp.net/attachments/612058753293877274/674751323073150986/my-image.png`,
            `Dimi - Sugden\nhttps://media.discordapp.net/attachments/612058753293877274/674802487097688095/unknown.png`, //120
            `Hentai - Sugden\nhttps://cdn.discordapp.com/attachments/612058753293877274/674825017971965953/unknown.png`,
            `Hentai - Soap\nhttps://cdn.discordapp.com/attachments/612058753293877274/674831377228627968/my-image_7.png`,
            `Mixtapes Vol.1 & 2 - Sugden\nhttps://media.discordapp.net/attachments/612058753293877274/675132439701487627/Mixtape_Vol._1__2_Tier_List.png`,
            `Christmas Songs - Soap\nhttps://media.discordapp.net/attachments/612058753293877274/682284204024791090/my-image_1.png`,
            `Valentines Day - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/677896838044450837/unknown.png`, //125
            `Which Timcord Emote Are You? - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/677902168489066506/63049ac0-95e7-41f6-8cf8-528d3cddeef3.png`,
            `Tarot Cards - Cael\nhttps://cdn.discordapp.com/attachments/612058753293877274/677973924595892255/b7f5312d-25f5-4260-a701-8ab0ff37130f.png`,
            `Sapsuckers - AL\nhttps://cdn.discordapp.com/attachments/612063946643472389/678457761905901608/my-image3.png`,
            `Sleepover - Coffee\nhttps://cdn.discordapp.com/attachments/612063946643472389/678457846014148619/image0.png`,
            `Math stuff lol you wouldn't get it - Coffee\nhttps://cdn.discordapp.com/attachments/612058753293877274/680516542156243010/image0.png`, //130
            `Planets - Coffee\nhttps://cdn.discordapp.com/attachments/612058753293877274/681541421550927945/image0.png`,
            `le Adulting - Silver\nhttps://cdn.discordapp.com/attachments/612058753293877274/682441560159289400/l8bW246yk3l3wEnWcHbyhEydgAAAABJRU5ErkJggg.png`,
            `e-boy - AL\nhttps://cdn.discordapp.com/attachments/612058753293877274/682450454923444390/my-image4.png`,
            `Jumpsquat Frames - Darsh\nhttps://cdn.discordapp.com/attachments/612058753293877274/690755124871692288/my-image_4.png`];

        if (args[0] && args[0] != '') { //If no second command, randomize
            if (args[0] === `NETPLAYGREETINGS` || args[0] === `GREETINGS`) {
                var split = lists[0].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SNEEZESOUNDS` || args[0] === `SNEEZE`) {
                var split = lists[1].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `KISS` || args[0] === `FLUSHED` || args[0] === `GAYYYYLMAOOOOOOOOOOOO`) {
                var split = lists[2].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `NICETOSOAP` || args[0] === `SOAP` || args[0] === `SOAPNICE` || args[0] === `NICE2SOAP` || args[0] === `NICE` || args[0] === `BIGGAYSTUPIDDOODY`) {
                var split = lists[3].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `DRUNK` || args[0] === `BUNK` || args[0] === `BLAZED` || args[0] === `LAZED` || args[0] === `BLAZEDLAZED` || args[0] === `DRUNKBUNK`) {
                var split = lists[4].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SCHWASTED` || args[0] === `SHWASTED` || args[0] === `WASTED` || args[0] === `DEGEN` || args[0] === `DEGENERATE`) {
                var split = lists[5].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CUPS` || args[0] === `PEPSI` || args[0] === `PEPSICUP`) {
                var split = lists[6].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `STUBBEDTOE` || args[0] === `STUBBED` || args[0] === `TOE`) {
                var split = lists[7].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `GAMER` || args[0] === `GAMERS`) {
                var split = lists[8].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `TYPO` || args[0] === `TYPOS`) {
                var split = lists[9].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `TECH` || args[0] === `TECHNOLOGY`) {
                var split = lists[10].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SEXSIM2` || args[0] === `SEXSIMULATION2`) {
                var split = lists[11].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `POO` || args[0] === `BIGGESTPOO` || args[0] === `POOP` || args[0] === `BIGGESTPOOP`) {
                var split = lists[12].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `STINKY` || args[0] === `UHOH` || args[0] === `UHOHSTINKY`) {
                var split = lists[13].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SEXSIM` || args[0] === `SEXSIMULATION` || args[0] === `METNALSIMULATION` || args[0] === `MENTALSIM`) {
                var split = lists[14].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SEX`) {
                var split = lists[15].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `EASEOFPLACEMENT`) {
                var split = lists[16].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `PLAYSTLE` || args[0] === `DPS` || args[0] === `TANK`) {
                var split = lists[17].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `PEEPEEPOOPOO` || args[0] === `PIPIPUPU`) {
                var split = lists[18].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `HOLYSTLE` || args[0] === `HOLY` || args[0] === `STYLEGRACE` || args[0] === `THISKONGHASAFUNNYFACE`) {
                var split = lists[19].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `ANTIPROMPT` || args[0] === `ANTIPROMPTBELIKE`) {
                var split = lists[20].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `POLITICS` || args[0] === `POLITICAL` || args[0] === `POLITICALALIGNMENT` || args[0] === `POLITICALCOMPASS`) {
                var split = lists[21].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `OGS` || args[0] === `OG` || args[0] === `ORIGINALS` || args[0] === `ORIGINAL` || args[0] === `OLDBOYS`) {
                var split = lists[22].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `BIRDCAEL` || args[0] === `BIRDSCAEL`) {
                var split = lists[23].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `MESSAGES` || args[0] === `TEXTCHAT` || args[0] === `POSTS`) {
                var split = lists[24].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `BIRDROG` || args[0] === `BIRDSPOUSES` || args[0] === `BIRD` || args[0] === `SPOUSE` || args[0] === `BIRDS` || args[0] === `BIRDSROG`) {
                var split = lists[25].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `BIRDSILVER` || args[0] === `BIRDSSILVER`) {
                var split = lists[26].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SELFIE` || args[0] === `SELFIEBLAST` || args[0] === `SELFIEBLASTING` || args[0] === `SELFIEPOSTS` || args[0] === `SELFIEPOST` || args[0] === `SELFIEPOSTING` || args[0] === `SELFIEBLASTS` || args[0] === `SELFIES`) {
                var split = lists[27].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `PR` || args[0] === `SKILL` || args[0] === `RANKING` || args[0] === `POWERRANKING` || args[0] === `POWERRANK` || args[0] === `GOOD`) {
                var split = lists[28].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `LEGS` || args[0] === `NUMBEROFLEGS` || args[0] === `LEG`) {
                var split = lists[29].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CUTE` || args[0] === `CUTEPFPS` || args[0] === `CUTEPROFILEPICS`) {
                var split = lists[30].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `PFPSSILVER` || args[0] === `PFPSILVER`) {
                var split = lists[31].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `DEADCORD` || args[0] === `DEDCORD` || args[0] === `DEADASSCORD`) {
                var split = lists[32].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `BOWSER` || args[0] === `BOWSERTALK` || args[0] === `BOWSERMENTIONS`) {
                var split = lists[33].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `OWN` || args[0] === `-OWN` || args[0] === `BROWN` || args[0] === `BLOWN` || args[0] === `CROWN` || args[0] === `DOWNTOWN`) {
                var split = lists[34].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `LAB` || args[0] === `CHADBRAD` || args[0] === `BRAD` || args[0] === `DADDY` || args[0] === `LABBY` || args[0] === `LABBYDADDY`) {
                var split = lists[35].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `NOOFBITS` || args[0] === `BITSNUMBER` || args[0] === `NUMBEROFBITS`) {
                var split = lists[36].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `DEADASS` || args[0] === `NOCAP` || args[0] === `DEADASSNOCAP`) {
                var split = lists[37].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `PFPSROG` || args[0] === `PFPSROGNUT` || args[0] === `PFPROG`) {
                var split = lists[38].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `COLORS` || args[0] === `COLOR` || args[0] === `COLOUR` || args[0] === `COLOURS`) {
                var split = lists[39].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `MAFIA` || args[0] === `MAFIAROLES`) {
                var split = lists[40].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `HUMANDANCER` || args[0] === `HUMANROBOT` || args[0] === `HUMANDANCERROBOT` || args[0] === `HUMANROBOTDANCER` || args[0] === `DANCER` || args[0] === `HUMAN` || args[0] === `ROBOT`) {
                var split = lists[41].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `WUB`) {
                var split = lists[42].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `WIZARD` || args[0] === `MAGIC` || args[0] === `WIZARDS`) {
                var split = lists[43].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `AUTISM` || args[0] === `AUTIST` || args[0] === `AUTISTS` || args[0] === `TISM`) {
                var split = lists[44].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `COOL` || args[0] === `COOLNESS`) {
                var split = lists[45].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CHOCCYMILK` || args[0] === `CHOCCY` || args[0] === `CHOCOLATEMILK`) {
                var split = lists[46].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `COMMITMENT`) {
                var split = lists[47].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SPOTW`) {
                var split = lists[48].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `FORTNITE` || args[0] === `FORTNITEDANCE` || args[0] === `FORTNITEDANCING`) {
                var split = lists[49].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `NWORD` || args[0] === `NWORDS`) {
                var split = lists[50].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `GEOGRAPHY` || args[0] === `MAP` || args[0] === `WHEREYOUAT`) {
                var split = lists[51].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `MAIN` || args[0] === `MAINS`) {
                var split = lists[52].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `MORNING` || args[0] === `MORNINGPEOPLE`) {
                var split = lists[53].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `ASS` || args[0] === `EATASS` || args[0] === `EATINGASS` || args[0] === `ANALINGESTION`) {
                var split = lists[54].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `FACES`) {
                var split = lists[55].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `ZOMBIE` || args[0] === `ZOMBIES` || args[0] === `ZOMBIEAPOCALYPSE` || args[0] === `APOCALYPSE`) {
                var split = lists[56].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CONTRARIAN` || args[0] === `CONTRARIANS`) {
                var split = lists[57].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `ELEMENTS` || args[0] === `ELEMENT` || args[0] === `ELEMENTAL`) {
                var split = lists[58].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SOUTH` || args[0] === `SOUTHERN` || args[0] === `SOUTHERVALUES` || args[0] === `THESOUTHWILLRISEAGAIN`) {
                var split = lists[59].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SIMILARITY` || args[0] === `SIMILARITIES` || args[0] === `LIKENESS`) {
                var split = lists[60].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `VIBE` || args[0] === `VIBES` || args[0] === `VIBECHECK`) {
                var split = lists[61].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `COFFEE` || args[0] === `YOUHATETOSEEIT` || args[0] === `HATETOSEEIT` || args[0] === `HATE`) {
                var split = lists[62].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `WEST` || args[0] === `WESTCOAST` || args[0] === `WESTCOASTHOURS`) {
                var split = lists[63].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `DRUGS` || args[0] === `DRUG` || args[0] === `DONTDODRUGS`) {
                var split = lists[64].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `HORNY` || args[0] === `HORNYNESS` || args[0] === `HORNYPOSTING` || args[0] === `HORNYPOST`) {
                var split = lists[65].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `GFY` || args[0] === `GFYCAT` || args[0] === `GFYCATABLE`) {
                var split = lists[66].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `COMBO` || args[0] === `FUNTOCOMBO`) {
                var split = lists[67].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `OLIVEOIL` || args[0] === `CLOSET`) {
                var split = lists[68].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SHEIK` || args[0] === `SHIEK`) {
                var split = lists[69].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `BOOMER` || args[0] === `BOOMERS` || args[0] === `ZOOMER` || args[0] === `ZOOMERS` || args[0] === `BOOM` || args[0] === `ZOOM` || args[0] === `BOOMZOOM` || args[0] === `BOOMERZOOMER` || args[0] === `ZOOMERBOOMER`) {
                var split = lists[70].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `EMOTES` || args[0] === `EMOTE`) {
                var split = lists[71].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `ALIGNMENT`) {
                var split = lists[72].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CHAD` || args[0] === `CHADS`) {
                var split = lists[73].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `NUMBERS` || args[0] === `NUMBER`) {
                var split = lists[74].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `PFP` || args[0] === `PFPS` || args[0] === `PFPSUGDEN` || args[0] === `PFPSSUGDEN`) {
                var split = lists[75].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CIVILWAR`) {
                var split = lists[76].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `EU` || args[0] === `COUNTRIES` || args[0] === `EUCOUNTRIES`) {
                var split = lists[77].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `NARUTO`) {
                var split = lists[78].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CARTOON` || args[0] === `CARTOONS` || args[0] === `CARTOONSUGDEN` || args[0] === `CARTOONSSUGDEN`) {
                var split = lists[79].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CARTOONSILVER` || args[0] === `CARTOONSSILVER`) {
                var split = lists[80].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `POKEMON` || args[0] === `POKEMONTYPE` || args[0] === `POKEMONTYPES` || args[0] === `TYPE` || args[0] === `TYPES`) {
                var split = lists[81].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `MIXTAPECOVERS` || args[0] === `COVERS` || args[0] === `ALBUMCOVERS` || args[0] === `COVER`) {
                var split = lists[82].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `MIXTAPEDREW` || args[0] === `MIXTAPESDREW`) {
                var split = lists[83].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CHEESY` || args[0] === `CHEESYPICS` || args[0] === `CHEESYPICTURES` || args[0] === `CHEESYPIC` || args[0] === `CHEESYPICTURE`) {
                var split = lists[84].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `BIT` || args[0] === `BITS` || args[0] === `OFFICIALBITTIERLIST`) {
                var split = lists[85].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `OOMER` || args[0] === `DOOMER` || args[0] === `BLOOMER`) {
                var split = lists[86].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `UNDERTALEOST` || args[0] === `UNDERTALE` || args[0] === `OST` || args[0] === `STUPIDFUCKINGPISSBABYGAME`) {
                var split = lists[87].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CHRISTMAS` || args[0] === `CHRISTMASNAMES`) {
                var split = lists[88].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `READING` || args[0] === `COMPREHENSION` || args[0] === `READ` || args[0] === `CANTREAD`) {
                var split = lists[89].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `IRONY` || args[0] === `SINCERITY` || args[0] === `IRONYSINCERITY`) {
                var split = lists[90].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `COMICS` || args[0] === `COMIC` || args[0] === `COMICAPPEARANCES` || args[0] === `COMICAPPEARANCE`) {
                var split = lists[91].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `ICEMASTER` || args[0] === `ICE` || args[0] === `ICEMASTER3000`) {
                var split = lists[92].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SHORTS` || args[0] === `JEANS` || args[0] === `DARK` || args[0] === `LIGHTSON` || args[0] === `JEANSHORTS` || args[0] === `JORTS`) {
                var split = lists[93].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `DAD` || args[0] === `UNCLE` || args[0] === `SHEIKLAME` || args[0] === `SHEIKCOOL`) {
                var split = lists[94].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CAEL` || args[0] === `WTF` || args[0] === `RETARD` || args[0] === `WHATTHEFUCK`) {
                var split = lists[95].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `NEET` || args[0] === `NEETS`) {
                var split = lists[96].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `GRILLEDCHEESE` || args[0] === `PBNJ` || args[0] === `PB&J` || args[0] === `JAMZ` || args[0] === `D1LAMB` || args[0] === `D1-LAMB`) {
                var split = lists[97].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `TITS` || args[0] === `TITSORASS` || args[0] === `DIGIMON` || args[0] === `POKEMON`) {
                var split = lists[98].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CANDY` || args[0] === `EVENTCANDY` || args[0] === `SUGDENCANDY`) {
                var split = lists[99].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `COMMAND` || args[0] === `COMMANDS`) {
                var split = lists[100].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CHILD` || args[0] === `KID` || args[0] === `HAVEACHILD`) {
                var split = lists[101].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SWIPER` || args[0] === `SWIPERNOSWIPING` || args[0] === `DORA`) {
                var split = lists[103].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `FIFTHGRADE` || args[0] === `MUSEUM` || args[0] === `FIELDTRIP`) {
                var split = lists[104].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `POOPING` || args[0] === `WOODS` || args[0] === `POOPINGINTHEWOODS`) {
                var split = lists[105].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `HOMEWORK` || args[0] === `IMPOSSIBLE` || args[0] === `IMPOSSIBLEHOMEWORK`) {
                var split = lists[106].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `PIZZAPARTY` || args[0] === `PIZZA`) {
                var split = lists[107].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `POECLASSES` || args[0] === `POE` || args[0] === `ASCENDANCY`) {
                var split = lists[108].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `HOLIDAYS`) {
                var split = lists[109].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `BAGELCHIP`) {
                var split = lists[110].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `BREAKFASTDRINKS`) {
                var split = lists[111].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `PREINDUSTRIAL` || args[0] === `PREINDUSTRIALJOBS`) {
                var split = lists[112].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `DROIDS`) {
                var split = lists[113].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `ROBOTALIENNINJAPIRATE`) {
                var split = lists[114].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `BUMP` || args[0] === `BUMPINTOSOMEONE`) {
                var split = lists[115].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SANDWICHMEAT` || args[0] === `SANDWICHMEATS`) {
                var split = lists[116].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `ICE`) {
                var split = lists[117].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `SPORTS`) {
                var split = lists[118].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `MCDONALDS` || args[0] === `WENDYS` || args[0] === `WENDY` || args[0] === `WENDYSVSMCDONALDS`) {
                var split = lists[119].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `DIMI`) {
                var split = lists[120].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `HENTAI`) {
                var min = 121;
                var max = 122;
                var r = Math.floor(Math.random() * (max - min + 1)) + min;
                var split = lists[r].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `MIXTAPES` || args[0] === `MIXTAPE` || args[0] === `SUGDENMIXTAPE`) {
                var split = lists[124].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `CHRISTMASSONGS` || args[0] === `CHRISTMASSOAP` || args[0] === `CHRISTMASMUSIC` || args[0] === `SOAPCHRISTMAS` || args[0] === `XMASSONGS` || args[0] === `XMASMUSIC`) {
                var split = lists[124].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else if (args[0] === `VALENTINE` || args[0] === `VALENTINES` || args[0] === `VALENTINESDAY` || args[0] === `ASKOUT`) {
                var split = lists[125].split(`\n`);
                message.channel.send(split[0], {file: split[1]});
            } else {
                message.channel.send(`Specified tier list not found.`);
            }
        } else { //randomize
            var r = Math.floor((Math.random() * lists.length));

            var splitstring = lists[r].split(`\n`);

            message.channel.send(splitstring[0], {file: splitstring[1]});
        }
    }

    //Tiermaker
    if (command === `TIERMAKER`) {
        var tms = [`https://tiermaker.com/create/melee-projectiles-v3-204742`,
            `https://tiermaker.com/create/ssbm-commentator-tier-list-252311`,
            `https://tiermaker.com/create/melee-players-204703`,
            `https://tiermaker.com/create/timcord-v2-204703`,
            `https://tiermaker.com/create/timcord-204703`];

        if (args[0] && args[0] != '') {
            if (args[0] === `PROJECTILES` || args[0] === `PROJECTILES`) {
                message.channel.send(tms[0]);
            } else if (args[0] === `COMMENTATORS`) {
                message.channel.send(tms[1]);
            } else if (args[0] === `PLAYERS` || args[0] === `TOPPLAYERS`) {
                message.channel.send(tms[2]);
            } else if (args[0] === `TIMCORD`) {
                message.channel.send(tms[3]);
            } else if (args[0] === `TIMCORDOLD` || args[0] === `OLDTIMCORD`) {
                message.channel.send(tms[4]);
            } else {
                message.channel.send(`Specified tier list not found.`);
            }

        } else {
            message.channel.send(`https://tiermaker.com/create/timcord-v2-204703`);
        }
    }

    //FakeCode
    if (command === `NETPIAY` || command === `METPLAY` || command === `NTPLY` || command === `NETPLY` || command === `NTPLAY` || command === `NETPLAU` || command === `NETPLAYY` || command === `NETPLAT` || command === `NETGAY` || command === `NWTPLAY` || command === `NETPKAY` || command === `NTPLAY` || command === `EPICCODE` || command === `NETOLAY` || command === `NETPLEY` || command === `NWTPLAU` || command === `NRTPLAY` || command === `NETPLSY` || command === `NEYPLAY` || command === `FAKECODE` || command === `CODEGEN`) {
        var result           = '';
        var characters       = '0123456789abcdef';
        var charactersLength = characters.length;
        for ( var i = 0; i < 8; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        message.channel.send(result);
    }


    //Specific Commands / People Commands

    //ADLP
    if (command === `ADLP` || command === `ACAB` || command === `COP`) {
        message.channel.send(`BABY LEGS!`, {
            file: "https://media.discordapp.net/attachments/612058753293877274/668943743436455965/unknown.png"
        });
    }

    //Ahampster
    if (command === `AHAMPSTER` || command === `HAMPSTER`) {
        message.channel.send(`??? - 2019\nBrutally murdered by a puff GIMR put on stream`);
    }

    //Airplane
    if (command === `AIRPLANE` || command === `AEROPLANE` || command === `POOB`) {
        var a = [`Welcome aboard ladies and gentleman, you are flying with Nair Canada`,
            `Plays Doc because his parents are asian`,
            `Once counterpicked Sheik vs a Mewtwo`,
            `once beat a gold puff`,
            `a man torn between two low tier secondaries`,
            `airplane moment...`,
            `Airplane moment...`,
            `Poob.`,
            `*joins voice*\n\n*leaves voice*`,
            `https://cdn.discordapp.com/attachments/612058753293877274/643274499445489664/airplane.PNG`,
            `https://cdn.discordapp.com/attachments/611202965558132747/694576237363855450/unknown.png`,
            `Once pill camped a bowser and still lost`];

        var r = Math.floor((Math.random() * a.length));

        message.channel.send(a[r]);
    }

    //Animelover
    if (command === `AL` || command === `ANIMELOVER` || command === `ANIMELOVER664` || command === `KRIS`) {
        var r = Math.random() * 25;

        if (r <= 4) {
            var m = [`https://cdn.discordapp.com/attachments/612063946643472389/637494850463203328/IMG_20191013_082122.jpg`,
                    `https://cdn.discordapp.com/attachments/566411042738143242/602660150599352320/IMG_20190715_065010.jpg`,
                    `https://cdn.discordapp.com/attachments/612325624203182085/683039367773552700/Concust.png`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/683378492254978116/Screenshot_20200229-102113.png`,
                    `https://media.discordapp.net/attachments/612058753293877274/672564438892544011/unknown.png`,
                    `https://media.discordapp.net/attachments/612058753293877274/734476772690755624/Polish_20200719_112810651.jpg`,
                    `https://media.discordapp.net/attachments/612061766830260244/749087261299310602/IMG_20200828_190443.jpg`];

            var r = Math.floor((Math.random() * m.length));

            message.channel.send({file: m[r]});

        } else {
            var d1 = [`I know what you're thinking: "Do NOT lamb D1." Well guess what? According to my calculations that wasn't really calculated, I have decided that it is the appropriate time for me to make a hard read and lamb the fuck out of that person. I'm a lambing GOD, and I'm 99.9% sure this person is mafia. If not, that's okay cause I'll be dead anyways. I'm sorry if I failed you, town. 3, 2, 1.`,
                    `Oh, just 🥩 succulent, tender 💦 HNG 💦 Just 🥩 Just a lil' 🥩🥩 I'm just preparing 🧂 That's it 💦 JUS'- 💦 Getting my 🐑 ready is all 🥩🥩 Oh JUST A BIT 💦 🧂🥩🥩🥩🧂 A LITTLE SAAAAAALT 🧂 SOME S-S-SPICE 🌶️🌶️ AHHHHHhhhhhh JUST 💦💦 GETTING MY 🐑🐑🐑🐑 ON 💯💯💯`,
                    `rr bitch`,
                    `im villi btw`,
                    `♿ D1 LAMB COMING THRU ♿`,
                    `eh heh.... sorry, didnt mean to fall on you and palm both of your double d sweater stretchers 😅`,
                    `drop trou`,
                    `you stoopid`,
                    `what's nine plus ten`,
                    `what's ten plus ten`,
                    `oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo`,
                    `br br deng br br deng`,
                    `uh oh \nstinky`,
                    `lol \nomg double lol`,
                    `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
                    `I sexually identify as the “I sexually identify as the “I sexually identify as an attack helicopter” joke” joke. Ever since u/Lazerc0bra posted 8 hours ago, I’ve dreamed of browsing reddit, shitposting on the unsuspecting comedy gods of r/copypasta. People say to me “oh for the love of god” and “please don’t let this be a thing”, but I don’t care, I’m meta as fuck. I’m having a plastic surgeon install an implant shaped like an upvote into my penis. From now on I want you guys to call me “leech” and respect my right to karma whore on a dead sub. If you can’t accept me you’re a normie and need to check your neckbeard privileges. Thank you for being so understanding.`,
                    `Hello my fellow townspeople, it is me, slugbait. I regret to inform you that my role in this game is the Clown, which is actually quite ironic because it reflects how I am in real life, however it is a role belonging to the mafia. I do not wish to cause harm to the innocents in the town, so I would please ask if you would kindly lynch me on this day. Thank you for your cooperation.`,
                    `lol bubbles you saying that reminded me of one time i was playing with some of the older kids from my apartment and i was trying to stand up to them cause they wre picking on me so i said "i dont care what you call me, even if you call me shrimp" but they misheard and started calling me shrek which was 10x more fucked up`,
                    `https://www.youtube.com/watch?time_continue=269&v=0lvwIW6Fvec&feature=emb_logo`,
                    `https://www.youtube.com/watch?v=-74jxaheG7I`,
                    `https://www.youtube.com/watch?v=wKnM_oUDg18`,
                    `wise fwom youw gwave`,
                    `https://tenor.com/view/pakistan-mcdonalds-commercial-tails-gif-8861168`,
                    `https://media.discordapp.net/attachments/672225366273818657/759127612021932122/unknown.png`,
                    `:rofl::rofl::rofl::ok_hand::ok_hand::thumbsup::sunglasses:`,
                    `https://tenor.com/view/mario-tire-change-anime-sad-super-mario-tire-gif-17314634`,
                    `https://tenor.com/view/ace-attorney-pass-the-ball-your-honor-fuckin-ballin-gif-17333724`];

            var r = Math.floor((Math.random() * d1.length));

            message.channel.send(d1[r]);
        }
    }

    //Antiprompt
    if (command === `ANTI` || command === `ANTIPROMPT`) {
        //https://cdn.discordapp.com/attachments/612061367972790281/638159668606140417/antiprompt_vs_the_world.png

        var r3 = Math.random() * 100;

        if (r3 > 95) {
            message.channel.send({file: `https://media.discordapp.net/attachments/571166424073240585/647274779266515000/npVqL8d.png`});
        } else {
            var a = [`Mario`,
                    `Mario`,
                    `Luigi`,
                    `Bowser`,
                    `Peach`,
                    `Princess Peach`,
                    `Daisy`,
                    `Wario`,
                    `Toad`,
                    `Yoshi`,
                    `King Bob-omb`,
                    `King Boo`,
                    `Kamek`,
                    `a goomba`,
                    `Bowser Jr.`,
                    `Waluigi`,
                    `Donkey Kong`,
                    `Toadette`,
                    `Captain Toad`,
                    `Birdo`,
                    `Rosalina`,
                    `Boom Boom`,
                    `Dry Bowser`,
                    `Petey Piranha`,
                    `Piranha Plant`,
                    `Toadsworth`];

            var r = Math.floor((Math.random() * a.length));
            var r2 = Math.floor((Math.random() * a.length));

            message.channel.send(`What if `+a[r]+` sex `+a[r2]);
        }
    }

    //AskGoiter
    if (command === `GOITER` || command === `ASKGOITER`) {
        var g = [`It is certain.`,
                `It is decidedly so.`,
                `Without a doubt.`,
                `Yes - definitely.`,
                `You may rely on it.`,
                `As I see it, yes.`,
                `Most likely.`,
                `Outlook good.`,
                `Yes.`,
                `Signs point to yes.`,
                `Reply hazy, try again.`,
                `Ask again later.`,
                `Better not tell you now.`,
                `Cannot predict now.`,
                `Concentrate and ask again.`,
                `Don't count on it.`,
                `My reply is no.`,
                `My sources say no.`,
                `Outlook not so good.`,
                `Very doubtful.`];

        var r = Math.floor((Math.random() * g.length));

        message.channel.send(g[r]);
    }

    //Axe
    if (command === `AXE` || command === `EXA`) {
        var a = [`AXE WON SUMMIT!!`,
                `pizza time`,
                `69`];

        var r = Math.floor((Math.random() * a.length));

        message.channel.send(a[r]);
    }

    //Bantha Collie
    if (command === `BANTHACOLLIE` || command === `BANTHA`) {
        var b = [`https://cdn.discordapp.com/attachments/612058753293877274/634836486373769216/Star-Wars-Bantha-Dog-Costume.png`,
            `https://66.media.tumblr.com/2d4a24380c712b6cfd8cd146cce87bc2/tumblr_o5s4cjSJjK1rhdp6mo1_500.jpg`,
            `https://images-na.ssl-images-amazon.com/images/I/41CWNxLvHcL.jpg`,
            `https://i.ytimg.com/vi/t1k6xq68DqE/maxresdefault.jpg`,
            `https://kiddingall.com/wp-content/uploads/2017/10/3numw28fl01x.jpg`,
            `https://www.dailydot.com/wp-content/uploads/96e/c3/fd2e374a0d0ec02420f3efe46102ef70.jpg`,
            `https://pbs.twimg.com/media/DqUavvTVYAEScUl.jpg`];

        var r = Math.floor((Math.random() * b.length));

        message.channel.send({file: b[r]});
    }

    //Based
    if (command === `BASED`) {
        message.channel.send(`https://cdn.discordapp.com/attachments/612058753293877274/711349304446550066/based.mp3`);
    }

    //Beywiz
    if (command === `BEYWIZ` || command === `BEY` || command === `BEYBEY`) {
        message.channel.send(`Fuck I woulda thrown a whole ass lobster`);
    }

    //Bobby big ballz
    if (command === `BBB` || command === `BOBBY` || command === `BOBBYBIGBALLZ` || command === `BOOBY`) {
        var b = [`https://www.youtube.com/watch?v=_deBAhQ06zk`,
                `https://www.youtube.com/watch?v=zoSHfRDsptU`,
                `https://www.youtube.com/watch?v=36JUiqRnrXk`,
                `https://www.youtube.com/watch?v=WYnx2Ek4Prc`,
                `https://www.youtube.com/watch?v=9K5jy6kniIo`,
                `https://www.youtube.com/watch?v=xwDHs6UXgR8`,
                `https://www.youtube.com/watch?v=zYW4GuwM1uI`,
                `https://www.youtube.com/watch?v=OuiBt08DfPw`,
                `https://www.youtube.com/watch?v=ESJOMtWx6nI`,
                `https://www.youtube.com/watch?v=eKo0F67N3kI`,
                `https://www.youtube.com/watch?v=pR119f9OPho`,
                `https://www.youtube.com/watch?v=p8LVgqGtYXg`,
                `https://www.youtube.com/watch?v=mYgopUL8kk8`,
                `https://www.youtube.com/watch?v=PDNJv92TCjk`,
                `https://www.youtube.com/watch?v=4Y8rQ_0zNIg`,
                `https://www.youtube.com/watch?v=5_CvRhqzVqs`,
                `https://www.youtube.com/watch?v=27chz2nVVOY`,
                `https://www.youtube.com/watch?v=B8T_3OSUMxU`,
                `https://www.youtube.com/watch?v=LA9ZiSB3SU8`,
                `https://www.youtube.com/watch?v=QFW6gJ_PrzY`,
                `https://www.youtube.com/watch?v=Ryz1BPSzLNo`,
                `https://www.youtube.com/watch?v=tgZfCJxe6ZA`,
                `https://www.youtube.com/watch?v=OdviRuA3kQM`,
                `https://www.youtube.com/watch?v=rTkkWsy3qaE`,
                `https://www.youtube.com/watch?v=tY3hfmlbSGE`,
                `https://www.youtube.com/watch?v=ustkY-WRVYM`,
                `https://www.youtube.com/watch?v=YDQN7VB6NJM`,
                `https://www.youtube.com/watch?v=GTmk1lBemUQ`,
                `https://www.youtube.com/watch?v=oLQnyNRXMhw`,
                `https://www.youtube.com/watch?v=ujEBPu8zx7I`,
                `https://www.youtube.com/watch?v=rCTtDic8-Tw`,
                `https://www.youtube.com/watch?v=J-QQQz1gx5s`,
                `https://www.youtube.com/watch?v=G8g5RLhOA80`,
                `https://www.youtube.com/watch?v=hfmlb70RWmg`,
                `https://www.youtube.com/watch?v=reMz-Ya51XM`,
                `https://www.youtube.com/watch?v=ifdMF2eSSgQ`,
                `https://www.youtube.com/watch?v=c5zOpByvDZk`,
                `https://www.youtube.com/watch?v=Kg465SHnEG8`,
                `https://www.youtube.com/watch?v=ubHXS81Ylks`,
                `https://www.youtube.com/watch?v=5QOHPCDmqH8`,
                `https://www.youtube.com/watch?v=QWeFofvgVb8`,
                `https://www.youtube.com/watch?v=4G6fhb6IBS0`,
                `https://www.youtube.com/watch?v=RyBYSSsuWUo`];

        var r = Math.floor((Math.random() * b.length));

        message.channel.send(b[r]);
    }

    //Bobingy / Bogingy
    if (command === `BOBINGY`) {
        message.channel.send(`It's the phrase sweeping the nation. Bogingy.`);
    }

    if (command === `BOGINGY` || command === `BOJINGLY` || command === `BOJINGLE` || command === `BOJIGGLY`) {
        message.channel.send(`It's the phrase sweeping the nation. Bobingy.`);
    }

    //Brio
    if (command === `BRIO` || command === `BRANDON` || command === `BRIOO` || command === `BRIOOO` || command === `BRIOOOO` || command === `BRIOOOOO` || command === `BRIOOOOOO` || command === `BRIOOOOOOO` || command === `BRIOOOOOOOO` || command === `BRIOOOOOOOOO` || command === `BRIOOOOOOOOOO` || command === `BRIOOOOOOOOOOO` || command === `BRIOOOOOOOOOOOO` || command === `BRIOOOOOOOOOOOOO` || command === `BRIOOOOOOOOOOOOOO` || command === `BRIOOOOOOOOOOOOOOO` || command === `BRIOOOOOOOOOOOOOOOO` || command === `BRIOOOOOOOOOOOOOOOOO` || command === `BRIOOOOOOOOOOOOOOOOOO` || command === `BRIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`) {
        var b = [`You know what this reminds me of? TF2 rocket jumping...`,
                `BRANDON IS CRAZY! \n(brandon is brio btw, i can use his first name because we are tight like that. yeah i know top players but its whatever to me lol`,
                `BRANDON IS CRAZY! \n(brandon is brio btw, i can use his first name because we are tight like that. yeah i know top players but its whatever to me lol`,
                `You stupid bitch, you stupid fucking bitch, you stupid fucking bitch`,
                `BRIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
                `I kid you not, he turns himself into a streamer. He becomes BrioIsMio, funniest shit I've ever seen. https://www.twitch.tv/brioismio`];

        var r = Math.floor((Math.random() * b.length));

        message.channel.send(b[r]);
    }

    //Bubbles
    if (command === `BUBBLES` || command === `BUBBLE` || command === `BUBLE` || command === `BUBL`) {
        var r = Math.random() * 100;
        if (r > 90) {
            message.channel.send(`Awooga`, {file: 'https://media.discordapp.net/attachments/612061766830260244/694292678703054938/Awooga.png'});
        } else {
            //Hummina hummina hummina AWOOGA eyes pop out tongue rolls out of mouth WOOP WOOP WOOP arf arf arf NOW THATS A DAME whistles i pant i pant and when you cant conrol it anymore i AWOOGA i drop to the the floor give 20 pushups and i have given obama the AWOOGA ALBUME SINK CUM AWOOGA KANYE WEST AWOOGA SINK POOP A girl... AND a gamer? Whoa mama! Hummina hummina hummina bazooooooiiiing! eyes pop out AROOOOOOGA! jaw drops tongue rolls out WOOF WOOF WOOF WOOF WOOF tongue bursts out of the outh uncontrollably leaking face WURLWRULWRLB tiny cupid shoots an arrow through heart Ahhhhhhhh my lady... heart in the shape of a heart starts beating so hard you can see it through shirt ba-b *jaw drops to the floor, eyes pop out of sockets accompanied by trumpets, heart beats out of chest, AWOOGA AWOOGA sound effect, pulls chain on train whistle that has appeared next to head as steam blows out, slam fist on table, rattling any plates, bowls or silverware, whistles loudly, fireworks shoot from top of head, pants loudly as tongue hangs out of mouth, wipes comically large bead of sweat from forehead, clears throat, straightens tie, combs hair Ahem, u look very lovely.... //add this
            message.channel.send(`(Jaw drops to the floor. Eyes pop out. Sound effect of "AWOOOGA AWOOOOGA!!!" Places eyes and jaw back in place. Regains composure.) ... Eh hem, you look quite lovely.`);
        }
    }

    //Cael
    if (command === `CAEL` || command === `KALE` || command === `THEDUDEFROMPOKEMONRSE`) {
        var r = Math.random() * 27;

        if (r <= 6) {
            var m = [`https://cdn.discordapp.com/attachments/612063946643472389/620757496352604202/unknown.png`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/640758529397096459/oil.png`,
                    `https://media.discordapp.net/attachments/612058753293877274/672564446710988810/unknown.png`,
                    `https://media.discordapp.net/attachments/612058753293877274/672564446710988810/unknown.png`,
                    `https://i.imgur.com/kew5Kn3.png`,
                    `https://i.imgur.com/AIrR3gM.png`];

            var r = Math.floor((Math.random() * m.length));

            message.channel.send({file: m[r]});

        } else {
            var h = [`~~Still waiting on his b0xx. He'll be so good once he starts playing on it, you'll see.~~ \nNEVERMIND HE GOT IT WOOOOOOOOOOOOOOOO`,
                    `The b0xx manifesto is only like half the length of Capital volume 1`,
                    `Has switched mains 37 times this year and counting`,
                    `thinks Kirby's Dream Course should've won the video game tournament`,
                    `women my age are kinda low tier\nfucking someone so young would feel kinda pedophilic`,
                    `was there a big armada/mango rivalry?`,
                    `I think that listening to rage against the machine is the fastest way to improve short term as pichu`,
                    `zizek really is just hegelfag lobsterman but his video where he rails against political correctness and how his black friends giving him the n word pass are useful for decoverting to be nazi imageboard users`,
                    `ok`,
                    `Doesn't know who Milkman is, despite Milkman being the 4th best player in his region`,
                    `I should do octo nut october\n8 times a day`,
                    `mom also found the rosemary`,
                    `mom found the olive oil :disappointed_relieved:`,
                    `read the lenin quote I posted earlier`,
                    `I was thinking about theology and basically realized I was better than god`,
                    `when medicare for all comes out you should be allowed a few colonoscopies per year unrelated to medical issues`,
                    `what even is caelposting`,
                    `I am become death, a tarot card that deals damage to all enemies in the room`,
                    `https://media.discordapp.net/attachments/612063670297427978/687449144540790872/IMG_20200311_195811.jpg\nhow tf am i supposed to know`,
                    `no furry but if you won't admit that isabelle is kinda cute doe you're lying`,
                    `plup samus isn't really cool`];

            var r = Math.floor((Math.random() * h.length));

            message.channel.send(h[r]);
        }
    }

    //Cagliostro
    if (command === `CAG` || command === `CAGLIOSTRO` || command === `CAGLIO` || command === `MENTALSIMULATION` || command === `MENTALSIM`) {
        var r = Math.random() * 5;

        if (r <= 2) {
            var m = [`https://cdn.discordapp.com/attachments/598336899010003015/599294726817972231/image0.jpg`,
                    `https://cdn.discordapp.com/attachments/612063946643472389/642569001146515467/unknown.png`];

            var r = Math.floor((Math.random() * m.length));

            message.channel.send({file: m[r]});

        } else {
            var h = [`https://docs.google.com/document/d/13i9BclOxbtFM4yWVTI3vHBvlgBGyhTEVATd-B7hbLZ0/edit?usp=sharing`,
                    `https://docs.google.com/document/d/1FHU80Z9xMjJxrXcx95V7Q3LCkU3Syt2CWLLyQYQN4qk`,
                    `bug catcher baby driver wants to battle!`];

            var r = Math.floor((Math.random() * h.length));

            message.channel.send(h[r]);
        }
    }

    //Cha Cha Slide
    if (command === `CHA` || command === `CHACHA` || command === `CHACHASLIDE`) {
        var c = [`Yeah, do that stuff`,
                `I'm out here y'all, peace!`,
                `Aw yeah`,
                `Cha cha now y'all`,
                `Charlie Brown`,
                `Two hops, Two hops`,
                `Cha cha again`,
                `Reverse Reverse`,
                `Reverse`,
                `Left foot now y'all`,
                `Right foot now`,
                `One hop`,
                `Like it never never stop`,
                `Can you bring it to the top`,
                `All the way to the floor`,
                `Can you go down low`,
                `How low can you go`,
                `Come on y'all, check it out`,
                `FREEZE! Everybody clap your hands`,
                `Left foot again`,
                `Right foot again`,
                `Five hops this time`,
                `Let's go to work`,
                `Cris-cross!`,
                `Slide to the right`,
                `Slide to the left`,
                `Left foot two stomps`,
                `Right foot two stomps`,
                `To the left`,
                `Take it back now y'all`,
                `One hop this time`,
                `Right foot let's stomp`,
                `Left foot let's stomp`,
                `Cha cha real smooth`,
                `Turn it out`,
                `Now it's time to get funky`,
                `To the right now`,
                `Hop it out now`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    }

    //Chandy
    if (command === `CHANDY` || command === `CHANMAN` || command === `CHANDYMAN` || command === `CHANCORE` || command === `CHANSTER` || command === `CHANDLER` || command === `CHANBLASTER` || command === `CHANBLASTERS`|| command === `CHANDYBLASTER` || command === `CHANDYBLASTERS` || command === `BLASTERS` || command === `MT64` || command === `TENNIS`) {
        var c = [`so yeah it's a tricky mix-up, but there are characters with the tools to mitigate its effectiveness and courts that invalidate bowser completely based on the match-up`,
                `again, the fact that there's no color trail on some of those top spin chance balls means that (against a human player), judging the right amount of charge to apply can be a total crapshoot`,
                `when he doesn't charge it enough, it goes out of bounds. if he charges too much, he'll hit the net. if he had better control and power, the sweetspot would be bigger, and there would be more semi-charge returns that would clear the net`,
                `and this is on a normal bounce strength court, bowser's best courts very on the match-up but he always wants high bounce. sometimes he wants a high speed court if he's playing against a weaker opponent like a speed type, but against a fellow power character he wants a slow court so that he's not totally incapable of chasing down angled shots`,
                `but if you give bowser the opportunity to move forward, he will just dismantle you at the net. all of the power characters have great reach but bowser is the second tallest character in the game, so getting around him if he manages to push up on the net is near impossible`,
                `if you don't constantly keep them moving around the court, they can set their feet and charge unreturnable smashes. it's much easier to do that if you're not on the backstep though, so you might be tempted to slice a lot to give yourself more time to recover and get back in the center of the court`,
                `even his medium strength shots have so much power that you can never be sure how to return them\nyour best bet is to play conservatively and that requires a technique character with mobility (like waluigi)\nbut more likely toad or shyguy in the current meta\nif the power character catches you out of position, it's really hard to take control of the pace of the volley from them`,
                `there's a very specific sweetspot for smashing a heavy topspin shot. uncharged or minimally charged and you'll get across the net, but it'll have too much hangtime and go OB\ntoo much charge and you'll muscle it down into the net`,
                `if it bounces with high spin, returning it with an overhead smash will result in a super shallow angle unless you have high control and power, and an even shallower return angle if you try a passing shot instead of volleying across`,
                `on a weak bounce court, this won't have as much of an impact, but on any other court,  you have to be super careful about how you receive a power character's topspin`,
                `this makes them very risky to return on courts with high bounce. bowser can hit a chance ball that looks like a perfect meatball jammed lob ("chance ball"), but lands with absurd spin.`,
                `in practice, this graphical quirk is mostly helpful for the extremely powerful characters on the cast\nbowser has to really swing on a fool to get a power trail, so a lot of his topspin volleys won't get a trail even though they're still travelling and spinning extremely fast`,
                `that's a nice serve that doesn't crack 60 mph, and his overhead smash is basically a drop shot disguised as a purple smash shot\nthat smash shot trail only appears because this boy is hitting close to his peak potential, even though in an absolute sense it's laughably weak`,
                `all that matters is that mario hits a powerful shot relative to what mario's potential power is\nhere's my meme character's stat loadout\ni don't know what's more disgusting, this build or the condition of my gba screen so you've been warned\nhttps://media.discordapp.net/attachments/542219115696226304/599760577258192897/image0.jpg`,
                `the particle trails do not appear at an absolute threshold of speed across the cast\nit's not like "if a shot is returned with slice and it exceeds 70 mph on the volley, then there's a blue trail"\nrather, the trail threshold is PROPORTIONAL to your character's maximum possible speed when returning a shot of that nature with the stroke they chose`,
                `Parents’ money\nWho the fuck else is going to a tennis academy run by Mario?\nIt’s canon in Power Tour’s storyline that your character is from the snobby rich kid academy\nSass, the working man’s tennis hunk, is from the Factory academy. Basically a technical school for dummies and COOLIES`,
                `The core mechanics of the “simple” rules have remained the same throughout pretty much every installment of the series and aces is no different.\nMy problem with Aces is that the roster is way too big and has too many tricky characters\n2 Tricky characters was the right amount. Boo and Paratroopa have tolerable, skill intensive gimmicks that still require you to have a grasp of the fundamentals.\nRosalina can frig right off with her dumb bull hockey.`,
                `https://www.youtube.com/playlist?list=PLV04ijEs_dq1hJCJXH1xmUV_WNJat5uQa`,
                `What makes the technique archetype hard to deal with is that they are very low power across the board, so they can often hit non-trailed weaker shots with tons of spin that are very visually indistinct`,
                `Just because you know what spin is on the ball, however, does not mean you’ll be able to anticipate where it bounces after the volley. The bounce happens right before your return shot, so characters with great spin stats (like Boo) will make you wait until the very last second to react appropriately.`,
                `Depending on where you’re positioned and whether or not it will be a forehand or backhand return, the optimal spin choice varies wildly`,
                `Overhead flat shots become smash shots with a particle trail\nOnce a stroke reaches a certain strength level (attained by charging, overhead positioning, or returning a stroke with a complementary spin type), it will gain the bright particle trail\nShots below this threshold only have a quick burst of particles`,
                `Topspin is orange, slice is blue, and flat shots are purple`,
                `You’ll see. I’ll upload some of the tennis lessons from the GBA game, they’re really quite interesting.`,
                `You guys just need to listen better and more\nAnd yknow, we USED to have a Mario sports channel\nIt wasn’t my choice to remove it`,
                `IT’S NOT RAMBLING\nIt’s not my fault I’m so good at explaining the core concepts of the game in great detail`,
                `That’s why handedness counterpicking is usually done double blind at the top of the set`,
                `Topspin serve is only optimal for 1/4 court positions\nFor the 3/4 others you need to mix up smash and slice`,
                `Now Sass... that boy’s a power factory\nHe’s got the second strongest smash serve in the game behind Bowser\nBut his slice serve is actually a bit faster than Bowser’s\nIf you’re playing righty then slice serves are the real workhorse`,
                `Y’know, Marth is actually in the Mario Tennis GBA game`,
                `IT’S A GREAT GAME WITH TONS OF NUANCE`,
                `cagliostro9 Last Friday at 12:15 PM: Chan we all know it’s real it’s just a good 60% of the chat doesn’t give a shit\nChandy Last Friday at 12:15 PM: Well I’m just going to have to keep explaining it until that 60% goes down to 0%`,
                `You guys act like I’m just making this shit up but it’s almost all supported by canon`,
                `I’m serious, the GBA and GBC games do an excellent job about teaching you good tennis stratagems`,
                `the GBA game is heavier on the instructional content and plot, so it's better as a self contained game. GBC is closest to N64 mechanically, but only very slightly. both are good introductions.`,
                `Wii VC is the most modern faithful release of the game. Wii U VC is more recent, but Wii U VC was significantly worse than Wii\nlaggy and bad color reproduction, like all Wii U N64 VC games`,
                `these guys really hate it when i talk about MT64 in huge walls of text, so you're always welcome to DM me if questions arise`,
                `and even then, my edited save is customized to polarize the lvl99 characters according to min/max instead of highest overall stats\nso alex is the speediest possible speedster, harry is the strongest he can possibly be etc`,
                `there would have to be a standardized stat and equipment loadout and everyone would have to download that special edited save\nthey're great for practice because you can customize them to have any set of broken stats though, so if there's a particular playstyle you struggle against you can optimize them towards that\nkind of like early amiibos in a way, since they gain EXP from being used in both games`,
                `after the top tiers, there are certain characters who can kind of hang and are soft counters on counterpick courts\nParatroopa is probably the worst character you can solo main on any court\nParatroopa, Toad, Shyguy, and Bowser are viable in certain match-ups with the right court`,
                `Waluigi is considered unviable against any speed character and baby mario and yoshi are some of the most popular, so RIP me`,
                `Mario, Luigi and the Princesses are too unspecialized to be worth using, mostly just good beginners characters`,
                `some people like to argue birdo is close to viable but she's the "technique" favored speed character so she's kind of saddled with the worst set of attributes\ni think she's the worst in the game because her niche isn't really good against anyone, but some people think speed is everything`,
                `DK runs into the same problem where he's the technique favored power character, but he's not as hopeless as birdo`,
                `the problem is that power characters get most of their mileage off the serve and early strokes so if you wanted a really good serving character with great shot placement, you'd just use boo and make up for a lack of raw power with broken serve gimmicks`,
                `playing the GBC game is actually a really good introduction to the core concepts of the meta and how it differs from IRL tennis in its unique and quirky ways`,
                `SS tier characters are wario and baby mario\nthe fastest power character and the strongest speed character, respectively\nS tier characters are boo, yoshi and DK Jr`,
                `the curse of bowser is that you're slicing all the god damn time to slow down the pace of the volley\nsince you have no mobility, you need the most time to get into a good position to anticipate a return\nso you have all the power in the world but you only really get to use it on the serve and the killstroke`,
                `i don't mean to imply that they are unga bunga, that's just a meme\nyou have to be really smart about spin choice as power characters`,
                `shy guy is sick. he's my secondary but he and waluigi play super different`,
                `i prefer technique as an archetype though, since the baits are my favorite part`,
                `honestly the secondary that would help me most is DK Jr, but i don't want to pick up an unga bunga power character`,
                `too many gimmick characters in aces\nthe two tricky characters in MT64 are very cool at top level\nshy guy should be considered a tricky character, although his gimmick is more like a core concept of his character\nrather than just a weird attribute or two like boo and paratroopa`,
                `it's a semi popular speedrunning game too, so mostly we congregate in the in the series wide mario tennis discord`,
                `they're legitimately good practice\nthey hit reactions that human players almost never do\nthat's why it's super hard to beat them at the net`,
                `it would have been a much more dominant performance if i had used the best technique character`,
                `i had to make several reads in that match\nseveral of them were unsuccessful reads too\nthe return game does not start off pretty`,
                `get overpowered on a top spin serve that forces me out of the flank, then i have to scramble back to midcourt but position myself somewhere to react to his return on the meatball i just gave him`,
                `i stopped my dash short so that i could react to the trajectory of where it would go if he had top spin smashed it, but then he hit a flat shot down the diagonal. if i had kept running i could have returned it but I had to guess\ntextbook unsuccessful read`,
                `the exact same situation happens at 2:08, and i don't cover that same angle down the diagonal\nthis time i run in that direction but decide to snake back to the left in case he goes for the mix-up and hits a straight shot down the left sideline\nagain, i guess wrong but this time i get lucky and he smashes it out of bounds`,
                `i wanted to show why waluigi conceptually struggles with speed characters`,
                `he's a max CPU on the best speed character in the entire game\nhe can read my controller inputs!!!`,
                `there are 50/50s i just have to take`,
                `of course not\nyou're fighting for your life in this match-up\ndid you not notice how conservatively i had to play on the returns?`,
                `when i saw that he didn't react well and push up on that slice, i knew i could put in the drop shot and push to the net`,
                `technique as an archetype is supposed to lose to speed anyway but i'll be damned if it isn't the paper in this rock paper scissors conundrum`,
                `i just realized that's an indirect endorsement of netplay\nlet me just clarify that this is not the position i hold whatsoever.`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    }

    //Chillindude
    if (command === `CHILLIN` || command === `BIGCHILLIN` || command === `CHILLINDUDE` || command === `MYB` || command === `CHILLINDUDE829` || command === `CHILLINDUDE82MUCH`) {
        var r = Math.random() * 119;

        if (r <= 65) {
            var m = [`https://cdn.discordapp.com/attachments/611202965558132747/622237508276584458/local_man_claims_to_have_evidence_of_The_Sasquatch.jpg`,
                    `https://cdn.discordapp.com/attachments/611202965558132747/622237622206464030/oh_i_am_leffin.jpg`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/622236526742601729/1545247849891.png`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/622236598150365193/B_L_A_C_K_E_D.jpg`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/622236644153491524/big_chillin_breaks_the_stream.webm`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/622236737002799124/chillin_buttstomps_the_stream.webm`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/622236804178771968/chillin_dab.webm`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/622236874987143208/chillin_is_hungry.webm`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/622236900312350760/Chillstar_Depths.jpg`,
                    `https://cdn.discordapp.com/attachments/612063946643472389/678446768119349308/1581823606101.png`,
                    `https://media.discordapp.net/attachments/603086993215455244/673291826035163146/image0.jpg`,
                    `https://media.discordapp.net/attachments/612061367972790281/729838176209731624/image0.jpg`];

            var r = Math.floor((Math.random() * m.length));

            message.channel.send({file: m[r]});

        } else {
            var h = [`I'm not lawful, make this pussy stop talking`,
                    `You're not one of the gods, you're one of the god-awfuls`,
                    `We all gawkin' when looking at your Fox`,
                    `Bitch, stick to Smash 4 and losing by four stocks`,
                    `Not a fan of your style`,
                    `You ain't standing your ground`,
                    `Get wins while kicking a man when he's down`,
                    `Like, "I beat Mango, I'm the favorite if he chokes! As far as Armada goes, I'll just wait 'til he's a host."`,
                    `Ain't no telling how foolish you'll be lookin'`,
                    `Evidence.zip can't contain the ass whooping`,
                    `Right when we realize the money match is over`,
                    `That'll be your cue to throw your controller`,
                    `Expose you as a fraud yeah I'll be blowing you up`,
                    `Who said you were a god?`,
                    `I know it wasn't Plup`,
                    `Been here ten years and you know I'm showing up`,
                    `For a man of many words, I think you've said enough`,
                    `But, the only way to make you hush`,
                    `First I'll body bag your Fox then .zip it shut`,
                    `'Imma put you in your place kid, you a disgrace`,
                    `Get killed quick like that missile hit you in the face`,
                    `After all of this you'll be watching your mouth`,
                    `Ain't no telling who'll be calling you out`,
                    `Salty Suite goes down, you better come correct`,
                    `Until you win a major show your elders some respect`,
                    `P.S. Leffen, I ain't done yet`,
                    `I'm the underdog so place your bets`,
                    `Whoever want to see Leffen looking dumb`,
                    `Throw your money on the line cause I'm making some`,
                    `Gotta say bro you're looking awfully weak`,
                    `Wait and see what happens at the Salty Suite`,
                    `Vanilla Fox don't suit you so go find another`,
                    `Teach you a lesson and take back my color`,
                    `Stepping to Mike, repping it right`,
                    `Killing in dubs like Leffen and Ice`,
                    `Losing to Eikelmann, guessing you aight`,
                    `Talking to Hugo, you stepped in the fight`,
                    `Yo, Mike's not even ready for that though. Check it.`,
                    `Your boy, Liquid Chillin, flows smooth as ice`,
                    `I smell bullshitting, that must be Mike`,
                    `When I start spitting, why, it sounds so nice`,
                    `Your frees prewritten, that's that shit I don't like`,
                    `Mike always having trouble staying on the beat`,
                    `And he having trouble playing Connor's Sheik`,
                    `Damn, gotta say you looking awfully weak`,
                    `Screaming getting wobbled, only time I hear you speak`,
                    `I guess they sponsor people now for being a choker`,
                    `You went from Brawl to Melee, still mediocre`,
                    `FatGoku ain't the the hard part, took your ass to game 5`,
                    `Maybe with a smart Marth, you could have beaten BladeWise`,
                    `Gotta keep it real, you know it's all love, bro`,
                    `No way you can beat me if you're dropping sets to Spud though`,
                    `Trying different angles, man, stick to one`,
                    `Yeah I got 5-0'd, you lost 6 to n0ne`,
                    `P.S. Mike, I ain't done yet`,
                    `Why we still waiting on your top 8 set?`,
                    `Yep, it looks like you got a nice stream`,
                    `But why I get more viewers on my BRB screen?`,
                    `Please keep it fresh man, 9th getting old`,
                    `No one catching on like when Ice read your roll`,
                    `This the only time that you get to be on stage`,
                    `And I don't play Jiggs, but I rest my case`,
                    `Yo Hugo? That's my dog... But I gotta hit a sub goal tho`,
                    `It's been a while, it's time for a new flow`,
                    `I'm Chillin, that's too cold, I'm taking a shot at Hugo`,
                    `How in the fuck you still losing to Drephen`,
                    `It's truly upsettin', I've been stomping that dude since '07`,
                    `And we got Faceroll, HAT, Alex and ChuDat`,
                    `I'm leavin' them dudes flat, you can't even do that`,
                    `Don't get me wrong we ain't talking bad players`,
                    `But you can't even sleep without nightmares of YAYUHZZ`,
                    `Pull it back, hit you with the slow flow`,
                    `Make the comeback like two stocks with SoPo`,
                    `Get back to labbing if you spent some time playing it`,
                    `You might stop losing to Falcon and maybe even to Ganon`,
                    `I still have faith, get back to the big stage`,
                    `Before that you gotta learn to beat KJH`,
                    `Why you out here making cakes of my face`,
                    `Try beating Tafo, that's a piece of cake`,
                    `Kira and Reno, why they still bop you`,
                    `My man still out here losing to Gahtzu`,
                    `HugS this year looking real shaky son`,
                    `How many Ganons you beat lately? n0ne`,
                    `You need to reflect like Alex19`,
                    `Maybe even need to practice on your stream`,
                    `I think all that BrainGear's bad for your head`,
                    `Why the fuck you on camera shavin' your legs?`,
                    `Shit gettin' heavy man, I feel kinda bad`,
                    `Maybe I should stop... Nah, fuck that`,
                    `Ready to go in, man, gimme the drop`,
                    `HugS whole year been getting bibbity bopped`,
                    `Can't say I expected it, it's really a shock`,
                    `That Samus so sloppy, man gimme a mop`,
                    `Guess you can't teach an old dog new tricks`,
                    `Who hasn't whoopedu hugs86?`,
                    `Placing 9th at locals, he must be feeling free`,
                    `But HugS will be fine, he got Social Security`,
                    `At this point, I guess it's pretty clear`,
                    `HugS really wishin' it was back to last year`,
                    `Maryland-Virginia, we fill his heart with fear`,
                    `Might be bad at Smash but at least he knows his beer`,
                    `P.S. Hugo, I find it kinda odd`,
                    `Got swept by SmashG0D, got swept by lloD`,
                    `Couple bad losses, maybe coulda shook it off`,
                    `Unranked Falco? That's Far from a good loss`,
                    `20th rank, but your skills might be fadin'`,
                    `My man lost to Plank, yeah that rank is outdated`,
                    `Might be top 50 but I'm tryna be nice \nAccurately speaking maybe 129th`,
                    `Das my dawwwwwg`,
                    `Dag mah, the heck?`,
                    `My B`];

            var r = Math.floor((Math.random() * h.length));

            message.channel.send(h[r]);
        }
    }

    //Chusday
    if (command === `CHU` || command === `CHUDAT` || command === `CHUSDAY`) {
        var d = new Date();

        if(d.getDay() == 2)
            message.channel.send('', { file: `https://cdn.discordapp.com/attachments/612063895082762250/628989768776286209/image0.jpg` });
        else
            message.channel.send(`Come back on Chusday, bitch.`);
    }

    //Coffee
    if (command === `COFFEE` || command === `SDDL`) {
        var onepercent = (Math.random() * 100);

        if (onepercent >= 99) {
            message.channel.send('you see it', { file: `https://cdn.discordapp.com/attachments/612063946643472389/645138709519532042/EJcYwlBUcAA70SD.png` });
        } else if (onepercent < 99 && onepercent >= 98) {
            message.channel.send('you love to see it', {file: `https://media.discordapp.net/attachments/612061766830260244/756042295769432154/unknown.png`});
        } else {
            var c = [`you hate to see it`,
                    `you love to see it`];

            var r = Math.floor((Math.random() * c.length));

            message.channel.send(c[r]);
        }
    }

    if (command === `LEGO` || command === `LEGOCOFFEE` || command === `LEGOCOFFEEWO` || command === `LEGOCOFFEEWOO` || command === `LEGOCOFFEEWOOO` || command === `LEGOCOFFEEWOOOO` || command === `LEGOCOFFEEWOOOOO` || command === `LEGOCOFFEEWOOOOOO` || command === `LEGOCOFFEEWOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOOOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOOOOOOOOOOOOO` || command === `LEGOCOFFEEWOOOOOOOOOOOOOOOOOOOOOOO`) {
        var memes = [`https://cdn.discordapp.com/attachments/601858642488066048/641825609676357644/image0.jpg`,
            `https://cdn.discordapp.com/attachments/601858642488066048/641825675736645662/image0.jpg`,
            `https://cdn.discordapp.com/attachments/601858642488066048/641825718766010368/image0.png`,
            `https://cdn.discordapp.com/attachments/601858642488066048/641825767520469016/image0.jpg`,
            `https://cdn.discordapp.com/attachments/601858642488066048/641843318443212801/image0.jpg`,
            `https://cdn.discordapp.com/attachments/601858642488066048/641843355868987423/image0.jpg`,
            `https://cdn.discordapp.com/attachments/601858642488066048/641844292163207179/image0.jpg`,
            `https://cdn.discordapp.com/attachments/601858642488066048/641844659597082635/image0.jpg`];

            var r = Math.floor((Math.random() * memes.length));

            message.channel.send({file: memes[r]});
    }

    //Compliment
    if (command === `COMPLEMENT` || command === `NICE` || command === `BENICE` || command === `COMPLEMENTS` || command === `COMPLIMENT` || command === `COMPLIMENTS`) {
        var complements = [`You are good at melee.`,
            `You are attractive.`,
            `You are loved.`,
            `You have friends who care about you.`,
            `You're the hoooomiee`,
            `You are funny.`,
            `People enjoy being around you.`,
            `You're sick, in a good way!`,
            `(Jaw drops to the floor. Eyes pop out. Sound effect of "AWOOOGA AWOOOOGA!!!" Places eyes and jaw back in place. Regains composure.) ... Eh hem, you look quite lovely.`,
            `LET'S GO `+sender.username.toUpperCase()+`! WOOOOOOOOOOOOO`,
            `You should've won Cum Champ 2k20`,
            `You're doing awesome today!`,
            `Whatever's got you down, you can get through it.`,
            `You are making a difference in the world.`];

        var r = Math.floor((Math.random() * complements.length));

        message.channel.send(complements[r]);
    }

    //Cool Mario
    if (command === `COOLMARIO` || command === `SWAGMARIO` || command === `COOLMARIOSCREENSHOT`) {
        var m = [`https://i.imgur.com/yiQLBxw.jpg`,
            `https://i.imgur.com/gQvCFTR.png`,
            `https://cdn.discordapp.com/attachments/612061367972790281/677339118434385920/IMG_20200212_202319.jpg`];

        var r = Math.floor((Math.random() * m.length));
        message.channel.send({file: m[r]});
    }

    //Coriamon
    if (command === `CORI` || command === `CORIAMON` || command === `CORYAMON`) {
        var c = [`Go to GOML.`,
            `Go to GOML.`,
            `Falco lasers aren't even that good, eh?`,
            `Falco lasers aren't even his best move`]

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    }

    //Cuck Daddy
    if (command === `CUCK` || command === `CUCKDADDY` || command === `MARGE` || command === `LARGEMARGE` || command === `CUCKDADDY420`) {
        var c = [`https://tenor.com/view/ariana-grande-gif-10730095`,
                `https://tenor.com/view/applause-clapping-gif-5833390`,
                `https://tenor.com/view/clapping-batman-joker-heathledger-clap-gif-5026817`,
                `https://tenor.com/view/minion-minions-clap-clapping-gif-5135454`,
                `https://tenor.com/view/eyeroll-annoyed-ugh-whatever-stanley-gif-4305664`,
                `https://tenor.com/view/antm-americas-next-top-model-miss-j-jalexander-omg-gif-3720930`,
                `https://tenor.com/view/jonah-hill-yay-greek-aldos-gif-7212866`,
                `https://tenor.com/view/mario-luigi-peach-melee-smashbros-gif-9370432`,
                `https://tenor.com/view/clapping-gif-5898697`,
                `https://tenor.com/view/drake-clap-fan-cheer-basketball-gif-4893625`,
                `https://cdn.discordapp.com/attachments/612325624203182085/613169424601448485/IMG_20190819_173556.jpg`,
                `https://tenor.com/view/iwould-like-to-see-it-smug-meme-monique-gif-13196153`,
                `https://tenor.com/view/kermit-tea-sip-gif-4973668`,
                `https://tenor.com/view/hmm-oops-dang-okaythen-kandi-gif-4596607`,
                `https://tenor.com/view/girl-sure-jan-sarcastic-brady-bunch-gif-11590179`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    }

    if (command === `CIARAN`) {
        var c = [`I *told* you to stop drinking alone, Ciaran!`,
                `Go get some friends, Ciaran!`,
                `Get off Grailed and go outside, Ciaran!`,
                `Stop wobbling people, Ciaran, that's mean!`,
                `Pick a cooler character, Ciaran!`,
                `PM is for weiners, Ciaran, play Melee!`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    }

    //CumChamp
    if (command === `CUMCHAMP` || command === `CUMCHAMPION` || command === `CAMPAIGN`) {
        var images = [`https://media.discordapp.net/attachments/612058753293877274/701869877316812850/CAMPAIGNPOSTER.png`,
            `https://cdn.discordapp.com/attachments/700735038417010718/702497443765551164/streammommy.png`,
            `https://cdn.discordapp.com/attachments/700735038417010718/702497467165573121/fozva1l.jpg`,
            `https://media.discordapp.net/attachments/700735038417010718/703367875141828647/unknown.png`,
            `https://media.discordapp.net/attachments/700735038417010718/703382021241831434/unknown.png`,
            `https://cdn.discordapp.com/attachments/700735038417010718/703401724550971534/icemaster.png`,
            `https://media.discordapp.net/attachments/612058753293877274/703442993566187540/unknown.png`,
            `https://media.discordapp.net/attachments/700735038417010718/704877376244285530/unknown.png`,
            `https://media.discordapp.net/attachments/700735038417010718/705115713907720192/unknown.png`,
            `https://media.discordapp.net/attachments/700735038417010718/705122132195147876/unknown.png`,
            `https://media.discordapp.net/attachments/700735038417010718/705128106725212231/1588185962617.png`,
            `https://media.discordapp.net/attachments/612058753293877274/705157139726860430/unknown.png`,
            `https://media.discordapp.net/attachments/700735038417010718/705381840994959372/Untitled.png`,
            `https://media.discordapp.net/attachments/700735038417010718/707244461570392105/unknown.png`,
            `https://cdn.discordapp.com/attachments/700735038417010718/707245500469870856/unknown.png`,
            `https://media.discordapp.net/attachments/700735038417010718/708452095170183269/unknown.png`,
            `https://media.discordapp.net/attachments/700735038417010718/709414153777053726/unknown.png`];

        var r = Math.floor((Math.random() * images.length));

        message.channel.send({file: images[r]});
    }

    //CumCoin
    if (command === `CUMCOIN`) {
        const embed = new Discord.RichEmbed()
            .setTitle(`CumCoin`)
            .setColor(0xFFFFFF)
            .addField(`Darsh's CumCoin`, `20000`, true)
            .addField(`Loscar's Cumcoin`, `20001`, true)
        message.channel.send({embed});
    }

    //Darsh/Stephen
    if (command === `DARSH` || command === `GANON` || command === `GANONDORF` || command === `LION`) {
        var r = Math.random() * 100;

        if (r > 97 && r <= 99) {
            var d = [`https://i.imgur.com/7OTDlmR.png`,
                `https://i.imgur.com/YTCkvjk.png`,
                `https://cdn.discordapp.com/attachments/672225366273818657/694599779791011870/unknown.png`];

            var r2 = Math.floor((Math.random() * d.length));

            message.channel.send({file: d[r2]});
        } else if (r > 99) {
            message.channel.send({file: `https://cdn.discordapp.com/attachments/612061198288027796/694630531953852516/IMG_20190506_214259.jpg`});
            message.channel.send({file: `https://cdn.discordapp.com/attachments/612061198288027796/694630532616683540/IMG_20190507_002554.jpg`});
        } else {
            message.channel.send(`My advice?\nGo to the gym.`);
            //message.channel.send(`My advice?\nWork out at home.`);
        }

    }

    if (command === `HOLLOWKNIGHT` || command === `HK` || command === `STEPHEN` || command === `STEPHENMCTOWELIE`) {
        var r2 = Math.random() * 100;

        if (r > 90 && r <= 95) {
            message.channel.send(`Proof that Melee is nothing like Hollow Knight`, {file: `https://media.discordapp.net/attachments/612061367972790281/694244463844917368/Melee_vs_Hollow_Knight.png`});
        } else if (r > 95) {
            message.channel.send({file: `https://media.discordapp.net/attachments/612063895082762250/694992160235454524/funny_hollow_knight_meme.png`});
        } else {
            var d = [`navigating a shitty maze slowly.`,
                    `playing a game just to be able to argue about it with your friends.`,
                    `a big maze of right angles instead of levels.`,
                    `The Hollow Knight being gay the whole time.`,
                    `being a slightly worse Metroid.`,
                    `not moving in the Z-axis.`,
                    `regressing from Dark Souls by removing an entire dimension.`,
                    `everything Darsh says being right.`,
                    `not having any control over the way you play.`,
                    `going through a place that actually exists and has a history.`,
                    `exploration that isn't even exploration.`,
                    `all the rooms looking the same.`,
                    `checking your map for open doors and going to them.`,
                    `no one being online to play netplay with you instead.`,
                    `dinosaurs.`,
                    `polish and mechanical innovations still not making metroidvanias any better.`,
                    `metroidvanias sucking my dick.`,
                    `being the literal best game of all time, as decided by some group of nerds.`,
                    `telling your friends your enlightened opinions.`,
                    `wasting your money and time.`,
                    `convincing all of your friends to play a shitty game.`,
                    `being a metroidvania for marth mains.`,
                    `being such a safe space that not even the gameplay can get you.`,
                    `Dark Souls if Dark Souls was bad.`];

            var r = Math.floor((Math.random() * d.length));

            message.channel.send(`Hollow Knight's a game about `+d[r]);
        }
    }

    //Default Pizza
    if (command === `PIZZA` || command === `PIZZATIME` || command === `DEFAULTPIZZA` || command === `DEFAULT`) {
        var p = [`https://www.papajohns.com/static-assets/a/images/web/product/pizzas/cheese-slate-compressed.jpg`,
            `https://www.simplyrecipes.com/wp-content/uploads/2019/09/easy-pepperoni-pizza-lead-4.jpg`,
            `https://media.discordapp.net/attachments/612061198288027796/697953543797342248/JPEG_20200409_193728.jpg`];

        var r = Math.floor((Math.random() * p.length));

        message.channel.send(`mmmmm, default pizza`, {file: p[r]});
    }

    //Diminnuendo
    if (command === `DIMI` || command === `DIMINNUENDO`) {
        var d = [`Who knew New Jersey had a botched foreskin problem?`,
                `im gay`,
                `im gay`,
                `im;gay`,
                `FUck youj`,
                `h`,
                `hhhhhhhhhhhhhhhh`,
                `im going to kiss timcord! \nmwah`,
                `hellyeahj,`,
                `/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////`,
                `im gay`,
                `**diminnuendo** is typing...`,
                `https://media.discordapp.net/attachments/612058753293877274/614814529641250816/ezgif-4-3e8037e6fc2f.gif`,
                `im@gay`,
                `https://cdn.discordapp.com/attachments/612058753293877274/690610531765059664/dimi.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/633728307065520129/8x1o66ghvtb01.jpg`,
                `<:popperga:659868423551189012> :pinching_hand: <a:dimi:614821651812581403>`,
                `Ass`,
                `https://media.discordapp.net/attachments/612058753293877274/736733189502140436/unknown.png https://media.discordapp.net/attachments/612058753293877274/736733307160494080/unknown.png`];

        var r = Math.floor((Math.random() * d.length));

        message.channel.send(d[r]);
    }

    //DJ Nintendo
    if (command === `DJ` || command === `DJNINTENDO` || command === `DJMUTENDO` || command === `KICKS` || command === `SHLICE` || command === `PAPAYASMACK` || command === `SCHMOOVIN`) {
        var d = [`KICKS`,
                `SCHLICE`,
                `Yup! That's a thing!`,
                `NOOOOOOOOOO DEEEEE EEEEEEYYYYEEEE`,
                `YO he hit him the Papaya Smack`,
                `Yo so he could've opted for a downsmash and covered everyhting there`,
                `Yo Mango is SCHMOOVIN right now`,
                `Yo Hax is OD right now`,
                `Yo Hax is SCHMOOOOOVIN`,
                `You know docs nair is stronger the longer it's out`,
                `*amsa DJ armor's through a Fox nair* \nGreat parry by amsa there`,
                `Yo what's cool about FD is that there's no platforms`,
                `both of these players are mixing each other up`];

        var r = Math.floor((Math.random() * d.length));

        message.channel.send(d[r]);
    }

    //Don't Care
    if (command === `DONTCARE` || command === `DIDNTASK`) {
        message.channel.send({file: `https://i.imgur.com/bH44hzg.png`})
    }

    //Dota
    if (command === `DOTA`) {
        message.channel.send(`Don'ta`);
    }

    //Draconitix
    if (command === `DRACO` || command === `DRACONITIX` || command === `JEBAITEDU`) {
        message.channel.send(`double or nothing`);
    }

    //Drax
    if (command === `DRAX`) {
        //message.channel.send(`Pokemon is not a game about skill. Pokemon is a game about spicy reads, wild hax, and mad disrespect.`);

        var p = [`**Gen 5 Random Battles**\nSugden vs Bubbles G1: https://replay.pokemonshowdown.com/gen5randombattle-1184597985`,
            `**Gen 5 Random Battles**\nFarmstink vs IceMaster G1: https://replay.pokemonshowdown.com/gen5randombattle-1184598879`,
            `**Gen 5 Random Battles**\nStreamo vs Soap G1: https://replay.pokemonshowdown.com/gen5randombattle-1184599042`,
            `**Gen 5 Random Battles**\nSugden vs Bubbles G2: https://replay.pokemonshowdown.com/gen5randombattle-1184601552`,
            `**Gen 5 Random Battles**\nSugden vs Bubbles G3: https://replay.pokemonshowdown.com/gen5randombattle-1184605264`,
            `**Gen 5 Random Battles**\nFarmstink vs Icemaster G2: https://replay.pokemonshowdown.com/gen5randombattle-1184605187`,
            `**Gen 5 Random Battles**\nStreamo vs Soap G2: https://replay.pokemonshowdown.com/gen5randombattle-1184605817`,
            `**Gen 5 Random Battles**\nWub vs Risc G1: https://replay.pokemonshowdown.com/gen5randombattle-1184608916`,
            `**Gen 5 Random Battles**\nFarmstink vs Drax G1: https://replay.pokemonshowdown.com/gen5randombattle-1184613252`,
            `**Gen 5 Random Battles**\nWub vs Risc G2: https://replay.pokemonshowdown.com/gen5randombattle-1184613877`,
            `**Gen 5 Random Battles**\nFarm vs Drax G2: https://replay.pokemonshowdown.com/gen5randombattle-1184617481`,
            `**Gen 5 Random Battles**\nWub vs Soap G1: https://replay.pokemonshowdown.com/gen5randombattle-1184620725`,
            `**Gen 5 Random Battles**\nStreamo vs Bubbles G1: https://replay.pokemonshowdown.com/gen5randombattle-1184625368`,
            `**Gen 5 Random Battles**\nRisc vs Drax G1: https://replay.pokemonshowdown.com/gen5randombattle-1184629267`,
            `**Gen 5 Random Battles**\nRisc vs Drax G2: https://replay.pokemonshowdown.com/gen5randombattle-1184632690`,
            `**Gen 5 Random Battles**\nSugden vs Ice G2: https://replay.pokemonshowdown.com/gen5randombattle-1184634295`,
            `**Gen 5 Random Battles**\nBubbles vs Streamo: G1 https://replay.pokemonshowdown.com/gen5randombattle-1184625368`,
            `**Gen 5 Random Battles**\nSugden vs Ice G1: https://replay.pokemonshowdown.com/gen5randombattle-1184629457`,
            `**Gen 5 Random Battles**\nBubbles vs Streamo G2: https://replay.pokemonshowdown.com/gen5randombattle-1184629550`,
            `**Gen 5 Random Battles**\nBubbles vs Streamo G3: https://replay.pokemonshowdown.com/gen5randombattle-1184632183`,
            `**Gen 5 Random Battles**\nFarmstink vs Soap G1: https://replay.pokemonshowdown.com/gen5randombattle-1184629735`,
            `**Gen 5 Random Battles**\nSugden vs Anti G1: https://replay.pokemonshowdown.com/gen5randombattle-1184638393`,
            `**Gen 5 Random Battles**\nFarm vs Soap G2: https://replay.pokemonshowdown.com/gen5randombattle-1184638329`,
            `**Gen 5 Random Battles**\nSugden vs Anti G2: https://replay.pokemonshowdown.com/gen5randombattle-1184643262`,
            `**Gen 5 Random Battles**\nFarm vs Soap G3: https://replay.pokemonshowdown.com/gen5randombattle-1184647592`,
            `**Gen 5 Random Battles**\nSugden vs Risc G1: https://replay.pokemonshowdown.com/gen5randombattle-1184649493`,
            `**Gen 5 Random Battles**\nSugden vs Risc G2: https://replay.pokemonshowdown.com/gen5randombattle-1184653890`,
            `**Gen 5 Random Battles**\nStreamo vs Farmstink G1: https://replay.pokemonshowdown.com/gen5randombattle-1184654091`,
            `**Gen 5 Random Battles**\nRisc vs Sugden G3: https://replay.pokemonshowdown.com/gen5randombattle-1184657644`,
            `**Gen 5 Random Battles**\nStreamo vs Farmshink G2: https://replay.pokemonshowdown.com/gen5randombattle-1184660011`,
            `**Gen 5 Random Battles**\nStreamo vs Farmshink G3: https://replay.pokemonshowdown.com/gen5randombattle-1184664176`,
            `**Gen 5 Random Battles**\nBubbles vs Drax G1: https://replay.pokemonshowdown.com/gen5randombattle-1184671299`,
            `**Gen 5 Random Battles**\nBubbles vs Drax G2: https://replay.pokemonshowdown.com/gen5randombattle-1184674064`,
            `**Gen 5 Random Battles**\nStreamo vs Risc G1: https://replay.pokemonshowdown.com/gen5randombattle-1184677508`,
            `**Gen 5 Random Battles**\nStreamo vs Risc G2: https://replay.pokemonshowdown.com/gen5randombattle-1184681625`,
            `**Gen 5 Random Battles**\nBubbles vs Risc G1: https://replay.pokemonshowdown.com/gen5randombattle-1184685623`,
            `**Gen 5 Random Battles**\nBubbles vs Risc G2: https://replay.pokemonshowdown.com/gen5randombattle-1184688032`,
            `**Gen 5 Random Battles**\nBubbles vs Risc G3: https://replay.pokemonshowdown.com/gen5randombattle-1184691598`,
            `**Gen 5 Random Battles**\nBubbles vs Drax G1: https://replay.pokemonshowdown.com/gen5randombattle-1184695048`,
            `**Gen 5 Random Battles**\nBubbles vs Drax G2: https://replay.pokemonshowdown.com/gen5randombattle-1184698799`,
            `**Gen 5 Random Battles**\nBubbles vs Drax G3: https://replay.pokemonshowdown.com/gen5randombattle-1184702353`,
            `**Gen 5 Random Battles**\nThug Finals: Drax vs Bubbles G1 https://replay.pokemonshowdown.com/gen5randombattle-1188067546`,
            `**Gen 5 Random Battles**\nThug Finals: Drax vs Bubbles G2 https://replay.pokemonshowdown.com/gen5randombattle-1188070208`,
            `**Gen 5 Random Battles**\nThug Finals: Drax vs Bubbles G4 https://replay.pokemonshowdown.com/gen5randombattle-1188075274`,
            `**Gen 5 Random Battles**\nThug Finals: Drax vs Bubbles G5 https://replay.pokemonshowdown.com/gen5randombattle-1188077734`];

            var r = Math.floor((Math.random() * p.length));

            message.channel.send(p[r]);
    }

    //Drew
    if (command === `DREW` || command === `ZMWIVD` || command === `ZIMWIT` || command === `ZIMMY` || command === `ZMWIVDDISHFSHJGHIEANIJMAETJNOTIMDRSHODMJORSJMN`) {
        var d = [`SubF`,
                `SubjectiveF`,
                `Sub`,
                `ADLP`,
                `Airplane`,
                `anime lover`,
                `Antiprompt`,
                `Brio`,
                `Bubbles`,
                `Cael`,
                `Cag`,
                `Chandy`,
                `Coffee`,
                `Coriamon`,
                `Cuck Daddy`,
                `Darsh`,
                `dimi`,
                `Drew`,
                `Zimmy`,
                `Zmwivd`,
                `Zimwit`,
                `Draco`,
                `Drax`,
                `DuckNumbers`,
                `Faceroll`,
                `Farmstink`,
                `FloatyApologist`,
                `Goiter`,
                `Goloche`,
                `IceMaster`,
                `Loscar`,
                `Midnight`,
                `Restingcarcass`,
                `Risc`,
                `Rognut`,
                `Rootnut`,
                `Silver`,
                `Illusion`,
                `Skrt`,
                `Soap`,
                `Stream Mommy`,
                `Struc`,
                `Sugden`,
                `Sugden_`,
                `Ted`,
                `Winnarly`,
                `Wub`];

        var r = Math.floor((Math.random() * d.length));

        message.channel.send(`No matter how you try easing people in here, they're gonna meet `+d[r]+` at some point.`);
    }

    //Duck fucking numbers
    if (command === `DUCK`) {
        message.channel.send(`*Watch this.*`);
    }

    if (command === `DUCKNUMBERS`) {
        message.channel.send(`quack`);
    }

    if (command === `DUCKFUCKINGNUMBERS`) {
        message.channel.send(`**DUCK** \n**FUCKING** \n**NUMBERS**`);
    }

    //Dugong
    if (command === `DUGONG`) {
        var d = [`https://media.discordapp.net/attachments/632626870487220257/704709389784842250/King_Neptune_Burger_Competition_28042020170312.jpg`,
            `https://media.discordapp.net/attachments/632626870487220257/704698950623428668/dugongo.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704699099118567484/tumblr_n238y4OuIr1qf6nh0o1_400.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704699227670053004/dugong_1993311c.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704699415067361301/16x9_m.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704699866689044512/eb5c43a71d83f4438b7e910342344e99.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704700271024013433/qZ7VHqyg.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704701458376949860/Screen_Shot_2020-04-28_at_10.31.41.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704701656381784084/Screen_Shot_2020-04-28_at_10.32.31.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704701812887912498/Screen_Shot_2020-04-28_at_10.33.08.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704702008283889764/dugong1.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704702694916489256/4145e0779dc6b73fdf8abc7202762db8.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704702893692944404/dugong-feature.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704703285785002055/maxresdefault.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704704163770138650/af82110a334a99699e75b1a4a98da501.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704704633087721583/manatee_and_dugong_by_gredinia_ddfwyxa-fullview.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704706518142156860/shutterstock_bernd.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704706799957311508/dugong.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704707174831489125/dugong-5.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704707335725252728/dugong-4.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704707657134768248/1116-31667.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704707872155631646/817-243203.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704708071678804019/manatee-swimming-wallpaper-preview.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704708827567882270/depositphotos_125523334-stock-photo-dugong-dugon-the-sea-cow.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704709165397966898/images.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704709389784842250/King_Neptune_Burger_Competition_28042020170312.jpg`,
            `https://media.discordapp.net/attachments/632626870487220257/704709510240927824/images.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704709693599121612/images.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704709740273336390/GEF_Madagascar-3891-2.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704710444702761100/27698564-8260567-Dugongs_closely_related_to_the_manatee_or_sea_cow_are_officially-a-4_1587985855630.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704710637996998686/Na-20-FEB-dugong.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704714006237282424/2Manatee0530.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704725283248406581/RZ0171-D-brandon-cole-dugong-underwater-photo.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704725523481493564/1-dugong-feeding-louise-murrayscience-photo-library.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704725616347316234/cbff59d75c74bf112ae5b18abf3d4320.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704725836636618832/dugong-eating-egypt-56a5f8b63df78cf7728ac097.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704726299129675896/200.gif`,
            `https://media.discordapp.net/attachments/632626870487220257/704726508572377108/giphy.gif`,
            `https://media.discordapp.net/attachments/632626870487220257/704726738718031912/MilkyDiligentAoudad-size_restricted.gif`,
            `https://media.discordapp.net/attachments/632626870487220257/704727836145221803/SXq8kb.gif`,
            `https://media.discordapp.net/attachments/632626870487220257/704730590288543744/antarctic.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704730783004360824/dugong_opt.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704731572984742020/Dugong-Dugon-The-Sea-Cow-portrait.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704731824412164186/hqdefault.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704732075059707924/q9mxASru6Bp5eu4xyCkJoIt6FwMj9bPJ728c0QIzDtzNvG2EQ9K8cxfQheCp-BtckJC0o8OlMwtTlVm5NXo6bwIZ6dzB02k0pIOQ.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704753177647644682/20287652408_50f2e6ceae_b.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704753438155735063/dugong.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704807420618211387/dugong-dugong-dugon-male-juvenile-golden-trevally-19737632.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704807486804197476/4beb9e65666f86c05209204e90ca39fa.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704807893580513320/o-MANATEES-900.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704863790465810492/images.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704863936478052412/image0.jpg`,
            `https://media.discordapp.net/attachments/632626870487220257/704896163408510981/Medium_WW1221.jpg`,
            `https://media.discordapp.net/attachments/632626870487220257/704896679970734162/dugong-underwater.jpg`,
            `https://i.kym-cdn.com/photos/images/newsfeed/000/325/155/697.jpg`];

            var r = Math.floor((Math.random() * d.length));

            message.channel.send({file: d[r]});
    }

    //e
    if (command === `E`) {
        message.channel.send('e');
    }

    //Faceroll
    if (command === `FACEROLL`) {
        var links = [`https://discord.gg/PmaVCqd`, //Wubcord
            `https://discord.gg/d3tem5Q`, //Nutcord
            `https://discord.gg/Qd8nUrK`, //Sun Dragon
            `https://discord.gg/9nce4W8`, //Sugden Appreciation
            `https://discord.gg/EdzHEGc`, //Ted Backroom
            `https://discord.gg/59u5d4X`, //Risc Appreciation
            `https://discord.gg/CxVgycy`, //TimCord Survivor
            `https://discord.gg/0x4uq2ABzu6gnICT`]; //Puff Server

        var r = Math.floor((Math.random() * links.length));

        message.channel.send(`Hey Faceroll. I don't know if you remember me. It would be weird if you did, because we've never met.\n\nIt's hard to tell when you're faced with life changing decisions. In the moment, the choice can seem insignificant. But years from now, you may look back on those small decisions and wonder what your life would have been like if you had only chosen differently. If you had only taken a chance.\n\nBear this in your mind as I extend to you one such small choice. A simple invitation to a simple discord. What lies beyond this invite, I cannot say. Nor can I say what ripples might extend outward from this decision into the water that is your life. I can only offer you the stone.\n\n`+links[r]);
    }

    //Farmstink
    if (command === `FARMSTINK` || command === `FARM` || command === `STINK`) {
        var f = [`“Now you’re really going to get punished for those f smashes you little bitch”`,
            `Darsh stomps his way over to the timid falco player, unbuttoning his pants as he moves.`,
            `Darsh finished undressing, revealing his rock hard musculature. Anti notices that something else is hard too, and can’t help but become aroused himself. His lust only grows as Darsh moonwalks closer.`,
            `Darsh now towers above anti, his sweat dripping onto the smaller man’s pale skin. “Goiter showed me this move,” Darsh bellows. In an instant, Darsh throws Anti up onto his bed and begins to drill his virgin ass.`,
            `This mixup confuses Anti at first. “Darsh just walked in here and started drilling my ass and I CAN’T do ANYTHING” he thinks.`,
            `In this euphoric state, his mind wonders and his consciousness grows. He becomes falco, and Darsh is sheik full hopping at him. He knows - no, understands - that there is nothing he can do. That total loss of control only makes him desire Darsh more.`,
            `For Darsh, it was never about the sex. He could get laid anytime he wanted. Granted, he could never keep up with Goiters appetite, but sex was never hard to come by.`,
            `Something about seeing Anti’s twink ass bouncing against him was different. It felt good, of course. God did it feel good. But there was also something else. This wasn’t just sex, it was a demonstration.`,
            `Anti’s ass became his world, and Darsh needed to show the world how sick he was.`,
            `Darsh came without warning, filling Anti’s ass with his warm coom. “That was a crazy mixup,” Anti thought to himself. He knew he could never say it out loud.`,
            `He liked getting fucked by Darsh, and Darsh liked fucking him. But to acknowledge this would be to ruin it, and they both knew it. Instead, they would go back to playing their games. Darsh, the masculine champion of the people, and Anti, the insubordinate twink.`,
            `Darsh pulled away and watched his viscous coom slowly drip out of Anti’s ass. “Stand up,” he said with a surprising amount of affection. “I’ll show you how to sticky walk.”`];

            var r = Math.floor((Math.random() * f.length));

            message.channel.send(f[r]);
    }

    //FloatyApologist
    if (command === `FLOATYAPOLOGIST` || command === `FLOATY` || command === `FLAPO`) {
        message.channel.send(`my middle name is Hungrybox`, {file: `https://media.discordapp.net/attachments/685993724911681560/707716372112867428/dkbJUFA.png`});
    }

    //GGs
    if (command === `GGS`) {
        message.channel.send(`https://cdn.discordapp.com/attachments/612061367972790281/711345843717931029/ggs.mp3`);
    }

    //GIMR
    if (command === `GIMR` || command === `GIMZ` || command === `GODISMYROCK`) {
        var r = Math.random() * 18;

        if (r <= 1) {
            message.channel.send({ file: `https://cdn.discordapp.com/attachments/612058753293877274/612091314770673675/gimr_lol.jpg` });

        } else {
            var h = [`Greed Is My Reason`,
                    `offline`,
                    `offline`,
                    `still offline`,
                    `GIMR Is My Rock`,
                    `GIMR Is Melee's Richardnixon`,
                    `Glock In My Rari`,
                    `Gayness In My Rectum`,
                    `Get Ingots, Melee RIP`,
                    `Garbage Idiot Making Ruin`,
                    `Goal: Invalidate Melee's Relevance`,
                    `Get In My Rump`,
                    `Gold Is My Reward`,
                    `Gosh, I'm Mad Retarded`,
                    `Gets Impotent Meleestream Routers`,
                    `God's In My Rectum`,
                    `GIMR Instinctively Murders Rats`,
                    `Gay Immoral Minor Relationships`];

            var r = Math.floor((Math.random() * h.length));

            message.channel.send(h[r]);
        }
    }

    //Goloche
    if (command === `GOLOCHE` || command === `STUPIDFRENCHIDIOT`) {
        message.channel.send(`Sup, G,\n\nI'm Goloche bitch and I would really like it if you could hire me for this job. I'm interested in GAMING.\n\nSo come through my DMs on Steam and I would be glad to call you back !\n\nSincerely,\nGoloche Magicien`);
    }

    //hungrybox
    if (command === `HBOX` || command === `HGOD` || command === `HUNGRYBOX` || command === `HJESUS` || command === `CLUTCHBOX` || command === `CLUTCHGOD` || command === `JUANTRUEGOD` || command === `HGAWD` || command === `HLEGEND` || command === `HBITCH` || command === `JUAN` || command === `JUANDIBIEDMA` || command === `HCHRIST` || command === `HWORD`) {
        var r = Math.random() * 45;

        if (r <= 15) {
            var m = [`https://cdn.discordapp.com/attachments/608818247877525526/610284902365003776/who_will_stand_up_to_this_man.png`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/610284756407681046/dedbox.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/613460838740787200/image0.jpg`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/610284515256041492/1522006502236.jpg`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/610284791014883329/HGOD_DABS_ON_THE_FOX_MAINS.jpg`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/610284717492928532/hbox_gets_redpilled.jpg`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/610284695912972328/hbox_boomer.png`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/610284654594883586/hbox_daberoni.jpg`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/610283520522190861/maxresdefault.png`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/612090137337397319/traitorcheck.png`,
                    `https://cdn.discordapp.com/attachments/567417652331413544/610957102453751809/unknown.png`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/610566498137800747/JPEG_20190812_131107.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/610270280685977613/EBuoEXdXoAEJXdF.png`,
                    `https://cdn.discordapp.com/attachments/612063895082762250/687036656439656449/dick_flattening.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/673616313603850271/unknown.png`,
                    `https://media.discordapp.net/attachments/612058753293877274/735164858642726992/pasta.PNG`];

            var r = Math.floor((Math.random() * m.length));

            message.channel.send({file: m[r]});

        } else {
            var h = [`I was really disappointed to see everyone in the chat and the crowd at CEO yelling “fuck hbox”. Say what you want about his character, hbox is a smart player. You don’t achieve the title of #1 by being a braindead player who sticks to one gimmick. There needs to be more respect for Hbox as a person. Right after the Axe vs. Wizzy grand finals at Smash Summit 8, when Hbox presented Axe the 1st place award, Hbox begins a heartfelt speech to Axe by saying “you know, I won this award last summit..” and starts breaking up. Immediately, Twitch chat starts saying “wow typical hungrybox making it all about himself.” Its absolutely amazing how everyone automatically assumes the worst and has never bothered to give the benefit of the doubt. If you go back and read /u/iamhungrybox comment on the Mango ama from 5 years ago, it’s really very awful how he’s been vilified in the community. Reminds me of Ken when he decided he wanted to retire. Everyone was rooting against him because he was the best, and he couldn’t handle the pressure. It’d be a fucking shame to see a talent like Hbox do the same. \nHbox if you see this, you’re fuckin sick at melee. Play the game for as long as you want to, but never feel pressured to keep going if its unhealthy. The internet and these communities suck ass when it comes to recognizing the pressure people in your position are in and the shit you’ve had to endure to get to where you are. \nYou’re great, man. Keep it up, proud of you.`,
                    `Puff fucking sucks. I never wanna hear any shit again from any Fox player complaining about Puff. Like suck my fucking dick if you think - no, honest to god - if you think, if you think, if you think, if you ever complain, if you're a Fox player and you ever complain about Puff, you need to reevaluate where you fucking stand. Because like, come on dude. That shit is not easy. Are you kidding me? I die from a grab up-throw up-air at like what, 45 on Yoshi's? If I land a rest on a platform, on a side-platform, at 32 percent I'm fucking dead? And people are giving me shit? Come on now, dude. No! No dude. I just got like wobbled. If you're gonna play this character with this infuriating infinite and I'm so done with ICs, oh dude, I just want, I hope every single game from here on out goes to 8 minutes. I hope every single time. And I'll taunt the fuck out of Sopo, every single time. I'm just, I'm so done with it, you know.`,
                    `Fuck this community man. All you guys ever do is look for ways to give me shit over any tiny thing. All 12 years of me playing Melee has been full of it. \nI’m literally mocked by my peers, my competitors, and community figureheads on a daily basis. \nLike what’s the point anymore`,
                    `For being the best player in the world, you're pretty immature. I think it's dumb you didn't even shake my hand after I beat you at NCR or even opt to take a picture with me and PPU for the results thread. \nMaybe I'm just bitter that you single-handedly turned an entire community against me and used your popularity to defame me and give people a completely wrong idea of me. It's weird that people on facebook still message me saying, "Dude you're actually a really nice person, everyone told me you were an asshole or something lawl". \nNow you've got the community in an even greater hold with your cult-esque fervor we call Mango Nation. You're the only person who can literally ride his own dick and people encourage you even more when you do it. If I was to even say a tenth of the self-promoting claims you make online, I'd have a brigade of hate lined up on top of the massive amount I already do. \nI don't have to go into how you treated me when I housed you and picked you up from the airport and the degrading and disgusting stuff you did and said about my mom. You think I don't remember? Not to mention saying similar things about my now ex-girlfriend. I really wanted to sock you in the fucking face so many times. \nBut I wouldn't stoop to that level. \nThe reality is, and the worst part is, that I have too much respect for you as a player. You've taken my favorite game and past-time to new levels and you constantly awe me with your advancing of the Melee meta-game. It keeps me on my feet and encourages me and countless others to keep playing. Everyone knows that, and no one can take that away from you.`,
                    `I have applauded your victories at EVERY tournament we've both been at. Every last once. I've shaken your hand and applauded you even after our sets. Even after Genesis 2, when you taunted me Game 3 as you were approaching a 4-stock on me. Even EVO, with the world watching. I took the approach of the bigger man, in hopes that maybe it would inspire you to do the same. And I was very wrong. \nThe thing is, now that the entire fighting game community knows of you, you have all the leverage you need to get your points across. You're the end-all for knowledge of the game and community. \nYou've gotten better about your attitude towards me, at least subtly. With Armada retired and with our tournament records in full display, I'm ranked #2 or #3 in the world behind you. Even still, you make it seem like I'm a joke for ever playing this game. \nAll I'd like is for you to just stop this nonsense and have at least an ounce of sportsmanship towards me. It's the least you could do after some of the things you've put me through that I won't mention. And don't just label off your actions as jokes. Yeah, you're a funny guy. But it's not nice being on the end of the stick for four years. \nMan up and be the representative this community actually needs.`,
                    `I was gonna do celebration stream, but uh, I thought it would be funnier if I created a new category on Twitch, called "DAN". So, "Doing Absolutely Nothing". So, if I was to go on Twitch on Tuesday, sit in front of my TV screen and literally absolutely nothing except stare in the webcam, for 3 hours, I wonder how many viewers that would get? Can we make a, new catgory? Can we make it uh, DAN? So if anyone wants to see me- if anyone wants to see me DAN on Tuesday, I think I'm gonna do it`,
                    `Y'know my goal here wasn't actually to win. It was for me to, uh, try, making friends again, with the top players in the community. It was like, for me to stop being the guy to talk so often and actually listen a little more. Honestly the best thing you can do for yourself I don't care what you do, just let go of your damn ego.`,
                    `hbox hit my car and laughed and when i tryed to call triple a he snapped my phone in half and yelled "LETS FUCKING GO"`,
                    `Someone asked me "like, great win, but why do you get so angry when that happens?" And I said "It's probably unhealthy, but I treat eveery single game here like life or death". Like I treat it like there's a revolver behind my head, and I have to win.`,
                    `Also this whole "ban wobbling" argument, w-when's the last time ICs won a supernational? I-I'lll wait. I can't think of one actually. It's weird that we wanna ban the 8th best character's number 1 tool to actually win, it's kind of strange to me. No-one likes getting wobbled - I hate getting wobbled, but if you are that salty that where everytime you get wobbled, if- every time you get wobbled, maybe don't get grabbed, don't get set up, maybe just get good for once in your life and actually stop blaming the fucking character.`,
                    `I'll tell the story. I was just a fan who was excited to meet and challenge Hbox to a $5 puff ditto best of 5 on dreamland. In the middle of game 1 he punched me in the liver and walked off with my wallet and JP White controller. Now I have to play melee through a straw.`,
                    `I told hbox it was nice to meet one of the best players in melee. He said "one of the best"? and started crying and popping off for some reason.`,
                    `PC is a \_\_\_\_\_\_\_\_\_\_`,
                    `hbox is p cool honestly. the last time i asked him for an autograph he didnt even spit on me like all the other times. i was discreetly escorted out of the venue by the security detail in his liquid entourage and given a coupon for 10% off liquid merch(pretty sweet!!)`,
                    `I was actually a mod on Hbox's twitch for a while- I met him at the Evo pool party and offered to buy him a drink, after I handed him the drink he turned his back on me mid-sentence and started talking to crunch instead`,
                    `I saw Hungrybox at a grocery store in Los Angeles yesterday. I told him how cool it was to meet him in person, but I didn’t want to be a douche and bother him and ask him for photos or anything. \nHe said, “Oh, like you’re doing now?” \nI was taken aback, and all I could say was “Huh?” but he kept cutting me off and going “huh? huh? huh?” and closing his hand shut in front of my face. I walked away and continued with my shopping, and I heard him chuckle as I walked off. When I came to pay for my stuff up front I saw him trying to walk out the doors with like fifteen Milky Ways in his hands without paying. \nThe girl at the counter was very nice about it and professional, and was like “Sir, you need to pay for those first.” At first he kept pretending to be tired and not hear her, but eventually turned back around and brought them to the counter. \nWhen she took one of the bars and started scanning it multiple times, he stopped her and told her to scan them each individually “to prevent any electrical infetterence,” and then turned around and winked at me. I don’t even think that’s a word. After she scanned each bar and put them in a bag and started to say the price, he kept interrupting her by yawning really loudly.`,
                    `I used to work at a sears and hbox came in to buy a memory foam mattress and he paid for it entirely in dimes and twitch bits that only work on his channel`,
                    `i read a rumor that hbox went to a cfl local with the flu once just so he could shake colbol's hands and infect him`,
                    `at smash n splash i went in the bathroom and someone was taking forever and it smelled AWFUL and who else comes out of the stall but hbox. his shit smelled so bad i legit went in another bathroom instead`,
                    `heard Hbox literally sees Jiggs backair as a metaphor for his penis and imagines himself pounding furry fox buttholes for days`,
                    `Hbox was behind me in line at Chick-Fil-A a few months ago. I was just waiting to be served when I heard some commotion behind me. I turn around to see Hbox walking in the door. "Hey, do y'all mind if I cut to the front of the line? I'm kind of in a hurry." Of course everyone agrees and he walks up to the counter. He orders 20 fucking chicken sandwiches. 20. I was still in shock from seeing him, but I try and strike up a conversation while he waits for his food. \"S- so, how do you feel about Chick-Fil-A and the gay rights controversy.\" He turns to me and says \"motherfucker, I come here BECAUSE I hate the gays!\" I'm stunned as the cashier brings Hbox his food. He picks up the tray, slams it on the ground, yells \"CLEAN IT UP\" at the cashier and walked out.`,
                    `The "H" in Hbox stands for Harvey Weinstein`,
                    `I use a B0XX so hbox doesnt meta read my DI`,
                    `Every single tournament Hbox wins, I always immediately check these threads to read every angry post. It's like crack to me. I can not get enough of this. \nIt's like you people don't realise just how amazing HungryBox really is at this game. \nYou are so simple-minded that you can't fathom that ''muh tech skill'' isn't all that Melee has to offer. Hbox has a deeper understanding of the game than any other player. His spacing and mindgames are simply off the chart when it comes to pure depth. \nAll these people playing literally the most OP character in the game can't do shit against Hbox's smart play. He's literally picking all of them apart and doing so much mental damage that they start second doubting themselves and throwing games. That's some powerful play. \nI love watching Melee. Not only do I get to see my all-time favourite player destroy everyone, but I also get to see you faggots bitch and whine about what's essentially a mid tier. Keep crying though, but it won't change anything. \nGood games, Hbox! Will be rooting for you next time as well. Not that you'll need it. Wouldn't expect anything less from the #1 ranked Melee player!`,
                    `And this weekend a miracle happened. I sat down to play Armada, I blinked, and my goal was suddenly behind me. A glass trophy in my hand with the official title written on it. Cameras flashing. Overwhelming emotion, disbelief, euphoria, and relief. Out of nowhere I played the best I have in my life while coming from losers. \nThe outpouring of congratulations I received was more than I ever would have imagined. It was a very beautiful experience to get to have that. And for that I'm very thankful. \nHowever, as expected there were some communities that don't see eye to eye on things. Like this subreddit, half of CFL Melee (my home community), and many others. And that's alright. That's reality. \nI'll never really understand why certain people don't realize what I put into this game. It might be the character I play. It might be my polarizing personality. But what I've learned is that you really can't focus on these things if you want to win. When I was on that stage I fell in love with Melee all over again. Just like I did when I attended my first very tournament in Florida and got 2nd to last place out of 40. \nI've had very difficult times reading things on this subreddit about me, but after this weekend I'm ready to move on from it. I proved to the world what I wanted to prove. I know I won't be able to change minds now or ever of that many people. But I respect your opinions and I encourage you to have them. I simply think it would be healthier for me to distance myself from it to continue performing at the level I want to. \nKeep playing Melee, keep cheering on your favorite player. Just love this game always. It's the best thing that's happened to me in a lot of ways, and I hope it's the same for you. \n-hungrybox`,
                    `Every time Hbox pulls through, and he does every time, I always make sure to check these threads immediately. You virgins are the source of some premium salt. \n \nKeep in mind that Hbox is playing Jigglypuff, essentially a mid tier character, in a meta where 50% of all top 100 players are maining Fox, which is Puff's absolutely worst MU sitting at 70-30 in Fox's favour. You're all just fucking scrubs who can't accept that HungryBox is the single best player to ever have touched a GC controller. This is undeniable facts at this point. \n \nNo one else has managed to prove again and again that my skill reigns supreme. Year after year of consistent wins over every single opponent. Taking tourney after tourney. \n \nStay mad, bitches. He'll keep winning.`,
                    `Hello /r/ssbm, \n \n I've read many, many, many things on this subreddit. A lot of them make me wonder about the backgrounds you all have had in competitive melee. My assumption is that most of you have at least attended/participated in one tournament and that you know a good bit about the history of the game. \n \nIf you have competed in the game, you're aware of what it's like to be in a hot seat. To have to think on the spot, adapt on the fly, cope with horrible losses, deal with salt, etc. \n \nMost of you (I think) understand what Melee is at its core. A phenomenal, unfathomably deep fighting game unlike any that's been created. It's why we love it and analyze it and have it as our passion. \n \nI've been competing for 10 years now. A lot of things have changed in this community. We almost didn't exist at one point when Brawl came out. We all had to pull a lot of weight to make sure we weren't forgotten and it's beautiful to see where we've gotten today. \n \nOnce Melee became a thriving, living community again it was a good time for me to focus on my own gameplay and not just the growth of the community. From 2013 to 2016 was probably my biggest era of growth both as a person maturing and as a Melee player. I obtained some much-needed discipline and learned more about myself from every event I attended. \n \nI yearned for the World Title. A massive goal for myself. And goals are something everyone here has - whether it's in Melee or outside of it. So I did everything I could to obtain that goal as soon as possible. I prioritized Melee for a summer, I got my best friend to be a sponsored coach for me, I became active in the Netplay community; Hell, I even took any chance to spread memes or information on social media about Smash. Because I love the community and I love what its given me.`,
                    `You know what, I admit it: I don't like HBox. At a fundamental level, I know it's not rational, but let me tell you what I do know: I don't like it when his slow, broken character dunks on my favorite players and kills my excitement. I don't like it when he grandstands during interviews and looks so fake and disingenuous. I don't like it when I have to watch everything I find awesome about this game get back-aired off stage or up-tilt rested time an time again until I don't feel anything anymore`,
                    `Yeah hfam we did it XD I'm literally DABBING on ALL the hbox haters in chat with my HFam right now LOL!`,
                    `Juan wakes up at 5:43 AM, before his morning alarm, ready to begin his typical Saturday morning ritual. Crunch is still asleep in the bed next to him, his body still warm where they touched. Juan violently shakes him awake yelling "LET'S FUCKING GO! IT'S TIME!" Crunch sluggishly rolls out of bed and says "Let... let me at least get ready first." Juan sits pouting on the edge of the bed while his coach uses the restroom, he hears a faint "What am I doing with my life...?" behind the closed door, but decides to ignore it.\n\nCrunch returns, and turns on the TV. Juan perks up, giddy with excitement. His adviser fumbles through loading up a PowerPoint presentation, but after a few minutes he's finally prepared. "Ready to start, Juan?" he says, and the answer is obvious. The first picture comes on the screen, a tweet from Mang0 at 2:23 AM the previous night.\n\n> got too wasted, not playing tomorrow\n> \n> good luck big leff\n> \n> ROFL\n> \n> GO EAGLES\n\n"FUUUUCK YEEEESSSS!" comes the inevitable scream from Juan, surely waking up the people in the neighboring hotel rooms. "FUCK THAT STUPID DRUNK IDIOT, NOW HIS FANS WI-"\n\n"Hooold up" Crunch cuts him off, "don't get carried away, there's more." Juan stares at the TV silently, his hands in a praying position. Crunch flips over to the next image. It's from Leffen.\n\n> feeling too sick to play, but might as well enter ultimate\n> \n> I'm tired of lying to you guys, the game is just easier. I'll definitely play melee at the next one, I promise.\n\n"YEEEEEEEESSSSSSSSS!!! FUCKING FUCK!!!!!" Juan shouts, tears coming to his eyes. "THEY HAVE TO GIVE ME #1 NOW! Tell me they'll give it to me again, Crunch."\n\n"Well, we'll have to wait and see. It's likely." Crunch replies, already afraid of Juan's response.\n\n"What do you mean wait and see? Who can stop me now? This is the most important tournament left! I'll have too many wins!" Juan is talking more quickly, becoming pink in the face like his signature character. Crunch just silently looks at him, and goes to the final picture. It's Zain's twitter.\n\n> Feeling great, see you guys tomorrow!\n\nJuan instinctively, almost preemptively lunges forward off the bed and brings both his fists down, smashing the TV. "Aw, come on man, not again..." comes a voice from the doorway. It's The Crimson Blur.`,
                    `https://www.youtube.com/watch?v=iAnuNZUMC1Q`];

            var r = Math.floor((Math.random() * h.length));

            message.channel.send(h[r]);
        }
    }

    //iBDW
    if (command === `IBDW` || command === `CODY` || command === `IBBW` || command === `IBDSM` || command === `INSFW` || command === `CODYSCHWAB`) {
        var r = Math.random() * 20;

        if (r <= 1) {
            message.channel.send({ file: `https://cdn.discordapp.com/attachments/672225366273818657/694551671098966138/unknown.png` });

        } else {
            var i = [`i Be Destroying Waterclosets`,
                    `i Blow Dude Weiners`,
                    `i Binge Drink Weekly`,
                    `i Bang Dudes Weekly`,
                    `i Be a Devil Worshiper`,
                    `i Be Defeating William`,
                    `i Be Doin Weed`,
                    `i Be Doin Weeeeeeeeeeeeeeeeeeeeeeeeeeed`,
                    `i Be Drinkin Water`,
                    `i've Been Defeated. Wack`,
                    `i Butcher Dirty Whores`,
                    `i Bone Dopey Women`,
                    `i Beat Defenseless Women`,
                    `i Bully Defenseless Whiteboys`,
                    `i Be Destroying Weebs`,
                    `i Be Dunkin Wobblers`,
                    `i Buy Double Wides`,
                    `i Bring Disgusting Water`,
                    `idolise Boring Dair Walls`,
                    `if Bob Doesn't, Why?`,
                    `i Bomb Da World`,
                    `i Be Double Wholesome 😇`,
                    `incels Be Dick Wanking`,
                    `i Been Doing Work`,
                    `idiot Box Does Wavedrop`,
                    `immigrants Banned, DonaldW`,
                    `i'll Ban Deez Wobblas`,
                    `iV Bag Didn't Win`,
                    `i Bought DiscordNitro, Why?`,
                    `iodine Boron Deuterium Tungsten`,
                    `insert Big Dongs Warily`,
                    `i Been Doing WubWubWowzy`,
                    `itchy Balls! Damn Whore!`,
                    `ironically Blame Desirable Women`,
                    `internet Bozo's Download Webm's`,
                    `i Believe Drash Wins`,
                    `infinite Boomers Defend Wackery`,
                    `if Boomer, Drown Well`,
                    `ionic Bonding Destroys Walls`,
                    `i Be Docking Weiners`,
                    `i Be Shittin`,
                    `i Beatthe Dominoes Worldchampion`,
                    `i be dimi. woah..`,
                    `i be developingpussy wetness`,
                    `i Be Dodging Wub https://clips.twitch.tv/AltruisticUnusualDuckHassaanChop`,
                    `insatiable Boob/Dick Wanting`,
                    `I been deflowering wives`,
                    `interpol's Best? Durnondabrite Wights`,
                    `incest Be Damn Wack!`,
                    `i Be Disconnecting Wifi`];

            var r = Math.floor((Math.random() * i.length));

            message.channel.send(i[r]);
        }
    }

    //IceMaster
    if (command === `ICE` || command === `ICEMASTER` || command === `SCOTTYDOO` || command === `ICEMASTER3000` || command === `ICEMASTER3K` || command === `POPEYE` || command === `ONIONBLESS` || command === `SCOTTYFLEX` || command === `ICEDADDY` || command === `ICEDAD`) {
        var i = [`I've decided that in tournament as Marf, my tag is Scotty-Doo, because he just do, ya know?\nBut when I enter as Falco... my tag will be Scotty-Flex.\n\nIt's perfect.`,
            `And the marfs in the cradle and the silver spoon... Hungrybox is the tru man-on-da-moon. When we gonna mm I don't know when... but I'll put a stop him thennn, I said I'm gonna stop him right thenn`,
            `Do you think "Onion Bless" is a slightly charming, yet overall pretty cool name?`,
            `Watching the matrix should be a solid reccomendation for new players coming from other smash games because of the part where morpheus explains to neo the matrix and what u can do in it`,
            `<:Popoga:648637180964634642>`,
            `https://cdn.discordapp.com/attachments/612061367972790281/677339118434385920/IMG_20200212_202319.jpg`,
            `The flex of darsh, the finesse of soap, and the bless of coffee. By mastering these three keys of enlightenment, you can become the sickest melee player on tc`];

        var r = Math.floor((Math.random() * i.length));

        message.channel.send(i[r]);
    }

    //Leffen
    if (command === `LEFFEN` || command === `LEFFEB` || command === `LEFF` || command === `YUNGLEFF`) {
        var r = Math.random();

        if (r <= .33) {
            message.channel.send(`Don't talk to me or my son ever again`, {file: `https://cdn.discordapp.com/attachments/612063895082762250/634026991347302431/IMG_20191011_082528.jpg`});
        } else if (r <= .66) {
            message.channel.send(`Leffen can still drop out!`);
        } else {
            var l = [`https://i.imgur.com/yiQLBxw.jpg`,
                `https://i.imgur.com/CXAndrQ.jpg`];

            var r2 = Math.floor((Math.random() * l.length));
            message.channel.send({file: l[r2]});
        }
    }

    //Loscar
    if (command === `LOSCAR` || command === `LOSCARLOS` || command === `CARLOS`) {
        var l = [`a bar`,
                `a bar`,
                `a bar`,
                `his boss's wife's house`,
                `a wedding`,
                `a funeral`,
                `a party`,
                `home\n\n...just kidding, he could be anywhere`,
                `work`,
                `work`,
                `a gas station`,
                `a bus stop`,
                `church`,
                `his parents' house`,
                `a mexican gang meeting`,
                `a bachelor's party`,
                `the Canary Island Hard Vaginas vs Hong Kong Sexy Bitches game`,
                `an airport`,
                `a Les Schwab Tire Center`,
                `a local`,
                `his good friend Mr. Ratburn's wedding`,
                `the Beerlympics`,
                `an open house`,
                `the driving seat of his car`,
                `a local, eating Pop tarts on stream`,
                `a trafffic jam`,
                `the MarbleLympics`,
                `the L'oscar Hotel in London`,
                `Chandy's Tacos`,
                `Taco Bell`,
                `a community outreach meeting`,
                `the airport to go to Nigeria`,
                `a Nigerian local`,
                `a WoW raid`];

        var r = Math.floor((Math.random() * l.length));

        message.channel.send(`Currently on discord at `+l[r]);
    }

    //Mango
    if (command === `MANGO` || command === `MANG0`) {
        var r = Math.random() * 35;

        if (r <= 5) {
            var m = [`https://cdn.discordapp.com/attachments/611202965558132747/613475440505389067/unknown.png`,
                    `https://cdn.discordapp.com/attachments/611202965558132747/613476344361123867/unknown.png`,
                    `https://cdn.discordapp.com/attachments/611202965558132747/613475625574989936/unknown.png`,
                    `https://media.discordapp.net/attachments/612061766830260244/678665058363899904/unknown.png`,
                    `https://cdn.discordapp.com/attachments/611202965558132747/613472979082543134/unknown.png`,];

            var r = Math.floor((Math.random() * m.length));

            message.channel.send({file: c[r]});

        } else {
            var w = [`LMAOOOOOOOOOOOOO \ni can say that i have grown up a lot in the last 2 years .. and i waited to shake ur hand at ncr but you were crying or whatever and i was gonna wait till you were finished \nAnd ive been more civil to you outside of smash for sure but when it comes to the game itself i have 0 respect for ur " skill " . I think ur a disgrace to the game and i think ur god awful. You learned 1 gimmick and abused it .. You never adapt to anything .. Ur just bad at the game and if you wanna shut me up. Beat me consistently dude and it will change .. Until then get off of reddit and go practice`,
                    `I won pound three =D \n \nim cocky so what \nEAT A \\*\\*\\*\\* PEOPLE \ncept the community <333`,
                    `Just post what ud rather do then play/watch brawl \n=D \n \nId Rather watch mikehaze run around shirtless in slowmotion ( mike <33 ) \nId rather tear off my own hands just so theres no chance i ever have \n2 play brawl .... but then get metal ones that only allow me 2 play melee =D \nId rather have lost pound three then brawl being made =/ lol \nId rather have pyschomidget ACTUALLY eat a \\*\\*\\*\\* then him play brawl lololol \n( socal melee community joke <33 ) \n!!!! \n\\*\\*\\*\\* thread`,
                    `**USA** \n**USA** \n**USA**`,
                    `1. My iq is as probably as high as your smash skill \nwhich probably isnt VERY HIGH \n2. You can suck my \\*\\*\\*\\* \n3 You can suck my \\*\\*\\*\\* \n4. Ima pro roulette player i came to gamble \n5. ummmmmmmmmmm i dunno \n6. Sup \n=D<3`,
                    `god ur sooooooo \\*\\*\\*\\* gay`,
                    `............ i really hate that \n\\*\\*\\*\\*\\*\\* \\*\\*\\* \\*\\*\\*\\*\\* peice of \\*\\*\\*\\* \n \nedit - im cool as \\*\\*\\*\\* in person \nsuck it`,
                    `=(((((((((((((((((((((((((((((((((((((((`,
                    `**silent wolf rapes** \n \nsilent wolf rapes`,
                    `loooooooooooooooooooooooooooooooooool`,
                    `Also the \\*\\*\\*\\* american version is wayyyy better \nand the \\*\\*\\*\\*ty euro version is a peice of \\*\\*\\*\\* \ni would \\*\\*\\*\\* that game also \nit wouldnt change ne thing cept \nlife looks alot easier in the euro version \nalot less gay \\*\\*\\*\\* \nWHICH U GUYS NEED \nIF U HAVE NE CHANCE OF BEATING ME \n \nAmerica baby`,
                    `your black \n \ngg`,
                    `what a black joke \n \n\\*\\*\\*\\* black mother fukers`,
                    `i agree lets ban puff`,
                    `america rapes \neveryone else sucks \n \nso much \\*\\*\\*\\*`,
                    `coming again to save the mother \\*\\*\\*\\*n day \narmada ur game is thru \ncause now u have to answer to \n \namerIIiIIcCcaAaaAA \n \nso lick my fox's \\*\\*\\* suck my falcons ballllllllllls`,
                    `*dances \n \n..... \ni pop a hoes cherry then i pop ma colllar`,
                    `\\*\\*\\* so big i told her look back at itttttttttttttttt`,
                    `noob mentality \n \ntrue champs wanna beat people at their best... \nI never feel good when I beat someone when they OBVIOUSLY do not play NOT UP 2 PAR \n \nnvm \n*FRANCE MENTALITY \nLMAOAO \nfreedom fries motha \\*\\*\\*\\*er`,
                    `SupPPpPpPPp`,
                    `^^^^^^ my point EXACTLY \nk im done posting here \nCYA GUYS <3 <--- for my fans everyone else can fall in a hole`,
                    `Suppppppppppppppppppppppppppppppppppppppppppp : 3`,
                    `ajp deeeeeeeeeeeeeeeeeeez nuttttts ROFLLL`,
                    `i never did homework in high school too busy winning pound 3 and such \n:)`,
                    `LMAOO \n=]`,
                    `id deff say im old school and new school mixed \n \nme and m2k had our first set/1 match at evo LMAOOO in 07 ( i won : 3 )\n \nPRETTY OLD SCHOOL IF U ASK ME \n \n \nand if this happens id rather be on the old school team\n \n\\*\\*\\*\\* the new school`,
                    `havent even said a word to hbox the last like 3 tourneys ROFLL`,
                    `<<<<<<<< #1 \n \nin case u were wondering \n \n \n \nLMAOOO`,
                    `whos tryna money match THE KID \n<--- the kid`,
                    `I had more rape combos but they had to cut some out so the video wouldnt be soo long =D`,
                    `THE RAPE IS OUT, BEST COMBO VIDEO EVER a combo video of mango alex19 and lucky i started amking the vid when i moved back from texas so its been a while but we didn't play like everyday so it took sometime and it was very hard to get us all in the same room at the same time so most of the time it was alex vs mango or alex vs lucky and once in a while it was all three of us so yea i hope everyone likes it but yea shit rapes and \nNORWALK RAPES\n\nrape ass editing- alex19\nmusic- xtreme hardcore albums5&6\nrape ass footage-alex mango lucky you should be able to tell whos who LOL if not we'll figure something out later lol`];

            var r = Math.floor((Math.random() * w.length));

            message.channel.send(w[r]);
        }
    }

    //Me
    if (command === `ME`) {
        message.delete(100);
        message.channel.send(`it was me :)`);
    }

    if (command === `YOU`) {
        message.delete(100);
        message.channel.send(`it was you :)`);
    }

    //Midnight
    if (command === `MIDNIGHT` || command === `MIDNIGHTLIFTER`) {
        var m = [`*fadeback upsmashes*`,
                `*reverse fadeback upsmashes*`,
                `*just stands there and upsmashes*`,
                `*triple upsmashes*`,
                `*quad upsmashes*`,
                `*disrespects women*`,
                `*disrespects women*`,
                `*uptilts instead of upsmash*\n\n*then upsmashes anyways*`,
                `shield pivot upsmashes`,
                `*runs at you and upsmashes*`];

        var clips = [`https://gfycat.com/feistyportlygroundbeetle`,
`https://gfycat.com/bothfelineblacklab-smashgifs-ssmb`,
`https://gfycat.com/wiltedsophisticatedhairstreakbutterfly`,
`https://gfycat.com/fastcommongardensnake`,
`https://gfycat.com/lividwelllitindianjackal`,
`https://gfycat.com/zigzagvictoriousimpala`,
`https://gfycat.com/vainsoftkoodoo`,
`https://gfycat.com/glitteringwickedkrill`,
`https://gfycat.com/slipperyflippantjumpingbean`,
`https://gfycat.com/madimpolitegosling`,
`https://gfycat.com/querulousashameddorado`];

        /*var m = [`tom you fucking idiot`,
            `tom and danny are screwing the pooch right now`,
            `oh my god there's already another recoupling`,
            `they're not actors! they're real people!`,
            `I love Curtis, he's like the best dude ever, but Amy SUCKS`,
            `Arabella's way too hot to go home`,
            `OH NO, AMY, YOU DUMB BITCH`,
            `man, molly mae's got that booty`,
            `Marvin's going home boys...`,
            `CURTIS IS CUDDLING HER?! WHAAA`,
            `Curtis has turned things back around, what a fantastic move`,
            `Amber quit referring to yourself as "us"`,
            `*disrespects women*`];*/

        var r = Math.floor((Math.random() * m.length));
        var r2 = Math.floor((Math.random() * clips.length));

        message.channel.send(m[r]+' '+clips[r2]);
    }

    //Milk
    if (command === `MILK`) {
        message.channel.send({file: `https://media.discordapp.net/attachments/612058753293877274/708372072979628092/image0.jpg`});
    }

    //Minecraft
    if (command === `MINECRAFT` || command === `MC`) {
        var m = [`That's not Minecraft, that's my wife!`,
                `GET THE FUCK OUT OF MY ROOM I'M PLAYING MINECRAAAFT`,
                `https://cdn.discordapp.com/attachments/612058753293877274/615589309411753991/emoji.png`,
                `What's you're favourite Minecraft block? :)`,
                `What's you're favourite Minecraft block?`,
                `What's your favourite Minecraft block? :)`,
                `What's you're favorite Minecraft block?`,
                `GET THE FUCK OUT OF MY ROOM I'M PLAYING MINECRAAAFT`,
                `What's your favorite Minecraft block?`,
                `What's your favourite Minecraft block?`,
                `So we back in the mine, got our pick axe swinging from side to side, side side to side,\nThis task a grueling one, hope to find some diamonds tonight, diamonds tonight \nHeads up, you hear a sound, turn around and look up, total shock fills your body, \nOh no it's you again, \nI could never forget those eyes eyes eyes, eyes eyes eyes eyes \n \n'Cause baby tonight, the creeper's trying to steal all our stuff again, \n'Cause baby tonight, you grab your pick, shovel and bolt again, \nAnd run, run until it's done, done, done, until the sun comes up in the morn' \n'Cause baby tonight, the creeper's trying to steal all our stuff again, \n \nJust when you think you're safe, overhear some hissing from right behind, \nThat's a nice life you have, shame it's gotta end at this time, \nBlows up, then your health bar drops, you could use a 1-up, get inside \nDon't be tardy, \nSo now you're stuck in there, half a heart is left but don't die \n \n'Cause baby tonight, the creeper's trying to steal all your stuff again, \n'Cause baby tonight, you grab your pick, shovel and bolt again, \nAnd run, run until it's done, done, until the sun comes up in the morn' \n'Cause baby tonight, the creeper's trying to steal all your stuff again, \n \nCreepers, you're mine \n \nDig up diamonds, and craft those diamonds and make some armor, \nGet it baby, go and forge that like you so, mlg pro, \nThe sword's made of diamonds, so come at me bro \n \nTraining in your room under the torch light, \nHone that form to get you ready for the big fight, \nEvery single day and the whole night, \nCreeper's out prowlin' - alright \n \nLook at me, look at you, \nTake my revenge that's what I'm gonna do, \nI'm a warrior baby, what else is new, \nAnd my blade's gonna tear through you \n \nBring it`,
                `Creeper? Aww man`];

        var r = Math.floor((Math.random() * m.length));

        message.channel.send(m[r]);
    }

    //Mmuller87
    if (command === `MMULLER` || command === `MMUELLER` || command === `MMU` || command === `DAB` || command === `DABONEM`) {
        var r = Math.random() * 9;

        if (r <= 4) {
            var m = [`https://cdn.discordapp.com/attachments/608818247877525526/610284791014883329/HGOD_DABS_ON_THE_FOX_MAINS.jpg`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/610284654594883586/hbox_daberoni.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/615589309411753991/emoji.png`,
                    `https://cdn.discordapp.com/attachments/612063946643472389/615231847688962049/sugden.png`];

            var r = Math.floor((Math.random() * m.length));

            message.channel.send({file: c[r]});
        } else {
            message.channel.send(`Dab on em`);
        }
    }

    //Muted
    if (command === `MUTED` || command === `MUTE`) {
        message.channel.send({file:`https://cdn.discordapp.com/attachments/612063946643472389/634597388773883933/society.png`});
    }

    //Nanchoman
    if (command === `NANCH` || command === `NANCHOMAN` || command === `BIGNANCH`) {
        message.channel.send(`Hello there! Ha! Just a little prequel meme humor for ya`);
    }

    //Never Cum
    if (command === `NEVER` || command === `NEVERCUM`) {
        var n = [`Never cum`,
                `Never cum`,
                `Never cum`,
                `Never cum`,
                `Never cum`,
                `Never cum`,
                `Never cum`,
                `Never cum \n \n \n \n \nNever cum`,
                `https://cdn.discordapp.com/attachments/612063946643472389/615231847688962049/sugden.png`,
                `https://cdn.discordapp.com/attachments/612058753293877274/684231922624495648/Screenshot_20200216-145617_Instagram.jpg`];

        var r = Math.floor((Math.random() * n.length));

        message.channel.send(n[r]);
    }

    if (command === `MEMETEST`) {
        message.channel.send(`asdf`, {file: ``});
    }

    //OC / memes
    if (command === `OC` || command === `MEME` || command === `MEMES` || command === `OCMEME` || command === `TCLE` || command === `FUNNY` || command === `HAHA`) {
        var withText = [`Made this to help visualize Farm's transition to a Falcon main.`,
            `Proof that Melee is nothing like Hollow Knight.`,
            `AL.jpg`,
            `CumChallenge2k20 Day 7, illustrated`,
            `https://www.youtube.com/watch?v=RHc6QQxgUbk&feature=youtu.be`,
            `silver using slippi to measure antiprompt's APM count circa 2019`,
            `https://www.youtube.com/watch?v=eCYsbjuJSyo`,
            `https://www.youtube.com/watch?v=k8Ic8aiHpdM`,
            `https://www.youtube.com/watch?v=lq46vpsDFXc`,
            `society if AL installed windows`,
            `this is how diarrhoea is made`,
            `makes you wonder, who's really controlling the narrative on timcord?`,
            `you see it`,
            `When someone says you can't manipulate space and time to control your luck`,
            `https://streamable.com/2dhnrr`,
            `https://cdn.discordapp.com/attachments/612058753293877274/730134990293303356/objection-147811.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/730129843114475671/fat.mp4`,
            `https://streamable.com/pryuh1`,
            `https://streamable.com/hmi1uy`,
            `https://streamable.com/axhaiy`,
            `https://streamable.com/w22eoa`,
            `https://www.youtube.com/watch?v=wFpV6SwrvcY&feature=youtu.be`,
            `History is written by the victors.`,
            `The Timcord Political Compass`,
            `https://cdn.discordapp.com/attachments/612063895082762250/750415053253115944/Smash_meme.mp4`,
            `https://cdn.discordapp.com/attachments/612061198288027796/743978086328172605/popoga.mp4`,
            `https://i.imgur.com/6eHtalb.mp4`,
            `https://cdn.discordapp.com/attachments/612063895082762250/740427191854301204/im_so_sorry.mp4`,
            `Anti unplugging his router:`,
            `https://www.youtube.com/watch?v=BywYATH_DLM`,
            `https://www.youtube.com/watch?v=FB4PJ-jDPBI`,
            `https://cdn.discordapp.com/attachments/612063946643472389/759480830074028070/2020-09-26_13-00-47.mp4`,
            `who will win`,
            `https://cdn.discordapp.com/attachments/612058753293877274/760327135889588264/cuckthanksvid.mp4`,
            `hey, heard Sugden sent you an invite the other day. Welcome to the server. Hope you stick around.`,
            `for my love...`,
            `https://cdn.discordapp.com/attachments/612063895082762250/762077298752094218/Kirby.mp4`,
            `Me during candy event`,
            `how goloche thinks the fight will go:`,
            `https://cdn.discordapp.com/attachments/612058753293877274/767604245108490260/Screen_Recording_20201019-001107_Chrome_1.mp4`,
            `just searched n word and found this lmao`,
            `me and darsh at the gym`,
            `https://cdn.discordapp.com/attachments/612058753293877274/774783351617880114/video0.mov`,
            `Timcord every morning`];

        var withTextImages = [`https://media.discordapp.net/attachments/612061766830260244/695703719089668157/Farmstinks_Transformation.png`,
            `https://media.discordapp.net/attachments/612061367972790281/694244463844917368/Melee_vs_Hollow_Knight.png`,
            `https://media.discordapp.net/attachments/612063895082762250/696031823402106890/8902184360_7d8e6b08f5_n.jpg`,
            `https://cdn.discordapp.com/attachments/612063895082762250/709230197810921553/cuck_vs_sugw.png`,
            ``,
            `https://cdn.discordapp.com/attachments/612061198288027796/713048928320487515/250.png`,
            ``,
            ``,
            ``,
            `https://cdn.discordapp.com/attachments/615454765886996481/716720953429721208/futurecity.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/722875035756265532/unknown.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/713184850307448882/questioneverything.png`,
            `https://media.discordapp.net/attachments/672225366273818657/709370400609402961/cuck_vs_sugw.png`,
            `https://cdn.discordapp.com/attachments/612063946643472389/645138709519532042/EJcYwlBUcAA70SD.png`,
            `https://media.discordapp.net/attachments/612061766830260244/729078290228445244/image0.jpg`,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            `https://media.discordapp.net/attachments/612061766830260244/754459944153120898/1th.png`,
            `https://media.discordapp.net/attachments/612061640694824960/753357938269356142/timcord_compass.png`,
            ``,
            ``,
            ``,
            ``,
            `https://media.discordapp.net/attachments/612063946643472389/737820773820923904/image0.png`,
            ``,
            ``,
            ``,
            `https://media.discordapp.net/attachments/612058753293877274/760242622575935548/unknown.png`,
            ``,
            `https://www.insidehook.com/wp-content/uploads/2020/07/tom_of_finland_leather_brotherhood.jpg`,
            `https://media.discordapp.net/attachments/612061766830260244/762067432164425748/c3ef22eb-05ab-4a86-b942-c3954f78d8d2.gif`,
            ``,
            `https://media.discordapp.net/attachments/612058753293877274/763155738133790730/unknown.png`,
            `https://media.discordapp.net/attachments/612061198288027796/764870369089159198/unknown.png`,
            ``,
            `https://media.discordapp.net/attachments/612061198288027796/770104461167034409/unknown.png`,
            `https://cdn.discordapp.com/attachments/612063895082762250/774631944746958848/edit.mp4`,
            ``,
            `https://media.discordapp.net/attachments/672225366273818657/779352204393185302/unknown.png`];

        var images = [`https://media.discordapp.net/attachments/612061766830260244/695703104678789210/image0.jpg`,
            `https://media.discordapp.net/attachments/612063895082762250/694992160235454524/funny_hollow_knight_meme.png`,
            `https://media.discordapp.net/attachments/612061766830260244/697563016018788462/Yup_its_team_coffee_time.png`,
            `https://media.discordapp.net/attachments/612058753293877274/699045456491315282/stream_mommy_posts.png`,
            `https://media.discordapp.net/attachments/612063895082762250/701331973347606628/Polish_20200419_002233338.jpg`,
            `https://media.discordapp.net/attachments/638438136921456640/701569970403934248/unknown.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/694698069526315089/Dimi_Time.jpg`,
            `https://cdn.discordapp.com/attachments/612061198288027796/681691860124696600/20200224_213949.png`,
            `https://cdn.discordapp.com/attachments/612063670297427978/687817958629572630/feet.png`,
            `https://media.discordapp.net/attachments/612325624203182085/700902793308930078/unknown.png`,
            `https://media.discordapp.net/attachments/612058753293877274/697204521339977909/unknown.png`,
            `https://media.discordapp.net/attachments/612061198288027796/702972132757602334/image0_2.png`,
            `https://media.discordapp.net/attachments/612325624203182085/703279581964271686/YbDliYx.png`,
            `https://media.discordapp.net/attachments/612058753293877274/703498747778170962/image0.jpg`,
            `https://media.discordapp.net/attachments/612061766830260244/703826239399395418/31292762_1967463326903007_4365815289808420864_n.png`,
            `https://media.discordapp.net/attachments/612061766830260244/704065355441766560/Team_coffee_wins_again.png`,
            `https://media.discordapp.net/attachments/632626870487220257/704706799957311508/dugong.png`,
            `https://media.discordapp.net/attachments/612058753293877274/704820827509489693/definitions.png`,
            `https://media.discordapp.net/attachments/612058753293877274/705430265593462784/Epic_Handshake_30042020164754.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/705430809317867580/3z9hay.png`,
            `https://media.discordapp.net/attachments/612058753293877274/705431128181440582/3z9hus.png`,
            `https://media.discordapp.net/attachments/612058753293877274/705431253188608162/Boy_and_Girl_Texting_30042020165150.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/705431363154608178/3z9i78.png`,
            `https://media.discordapp.net/attachments/612058753293877274/705431695863578624/He_Is_The_Messiah_30042020165336.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/705431904546979970/3z9j4o.png`,
            `https://media.discordapp.net/attachments/612058753293877274/705432709052497961/Carl_Meets_Shrek_In_The_Forest_30042020165737.jpg`,
            `https://media.discordapp.net/attachments/612061766830260244/706615425278148638/popoga_1_results.png`,
            `https://i.imgur.com/z88QYsx.png`,
            `https://media.discordapp.net/attachments/612058753293877274/704452857784565840/hqdefault.jpg`,
            `https://i.imgur.com/mZvFRTq.png`,
            `https://media.discordapp.net/attachments/612058753293877274/708131898878197820/im_sugden.png`,
            `https://media.discordapp.net/attachments/612061640694824960/708416557281312828/unknown.png`,
            `https://media.discordapp.net/attachments/672225366273818657/709370961383784509/unknown-1.png`,
            `https://media.discordapp.net/attachments/612058753293877274/709575207647576114/unknown.png`,
            `https://media.discordapp.net/attachments/612061766830260244/711385880148967444/image0.jpg`,
            `https://i.imgur.com/YOkabSH.png`,
            `https://i.imgur.com/l5MhW9F.png`,
            `https://i.imgur.com/rFLRcvZ.jpg`,
            `https://media.discordapp.net/attachments/612061367972790281/708174006817390612/Lonesome.png`,
            `https://media.discordapp.net/attachments/612061766830260244/711636947193430147/Capture.PNG`,
            `https://i.imgur.com/bH44hzg.png`,
            `https://media.discordapp.net/attachments/612058753293877274/708372072979628092/image0.jpg`,//HERE
            `https://cdn.discordapp.com/attachments/612063946643472389/715491561777135647/unknown.png`,
            `https://cdn.discordapp.com/attachments/612061766830260244/715499356937257010/unknown.png`,
            `https://cdn.discordapp.com/attachments/612061766830260244/716317633221230602/22228206_1465915996795669_1236699418406031529_n.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/719248400494755850/unknown.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/719253631387435028/unknown.png`,
            `https://cdn.discordapp.com/attachments/612063858911346700/719309968666263592/image0.jpg`,
            `https://cdn.discordapp.com/attachments/612063670297427978/720322997105197158/trust-no-one-not-even-yourself.jpg`,
            `https://cdn.discordapp.com/attachments/611202965558132747/723351881820274758/unknown.png`,
            `https://cdn.discordapp.com/attachments/612058753293877274/722127277890076693/Monkey_Receiving_An_Orange_15062020183546.jpg`,
            `https://cdn.discordapp.com/attachments/612063656036925502/714520959716950046/Oh_I_Just_Jog_Every_Once_in_a_While_25052020185107.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/708372072979628092/image0.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/725929179006107683/Polish_20200410_213721311.png`,
            `https://media.discordapp.net/attachments/612061766830260244/726155088674029598/unknown.png`,
            `https://media.discordapp.net/attachments/612061766830260244/727678002636521492/EbXyyoXVcAAhuVp.png`,
            `https://media.discordapp.net/attachments/612061766830260244/727780914024677436/unknown.png`,
            `https://media.discordapp.net/attachments/612058753293877274/728256331806670918/unknown.png`,
            `https://media.discordapp.net/attachments/612058753293877274/728309832737882232/unknown.png`,
            `https://media.discordapp.net/attachments/612058753293877274/728351949950550067/unknown.png`,
            `https://media.discordapp.net/attachments/612063895082762250/728649286186696714/image0.jpg`,
            `https://media.discordapp.net/attachments/612061766830260244/729079221544288307/unknown.png`,
            `https://media.discordapp.net/attachments/612061766830260244/729083303696662628/Tinky_Winky_Joins_Hand_Stacking_04072020231636.jpg`,
            `https://media.discordapp.net/attachments/612325624203182085/729409267408568410/DIMI_2016.png`,
            `https://media.discordapp.net/attachments/612058753293877274/730138040579915867/popoga2.PNG`,
            `https://media.discordapp.net/attachments/612061766830260244/731600068687298636/this.jpg`,
            `https://media.discordapp.net/attachments/612061766830260244/731640211624427590/unknown.png`,
            `https://media.discordapp.net/attachments/612061766830260244/733374447616131152/flapo.png`,
            `https://media.discordapp.net/attachments/612063895082762250/733347288021205053/unknown.png`,
            `https://media.discordapp.net/attachments/612061766830260244/733518086463946792/sheik_flowchart.png`,
            `https://media.discordapp.net/attachments/612058753293877274/733703015407812771/Screenshot_20200717-081204.png`,
            `https://media.discordapp.net/attachments/612063895082762250/757656587161698344/unknown.png`,
            `https://media.discordapp.net/attachments/612058753293877274/755847216840572989/20200916_134532.png`,
            `https://media.discordapp.net/attachments/612063895082762250/755487628534481006/pov_you_are_based.png`,
            `https://media.discordapp.net/attachments/612063895082762250/754540521023733890/unknown.png`,
            `https://media.discordapp.net/attachments/612061766830260244/753284920843042836/pyramid_scheme_timcord.png`,
            `https://media.discordapp.net/attachments/612061766830260244/753109477128929372/unknown.png`,
            `https://media.discordapp.net/attachments/612058753293877274/750740663682859087/image0.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/750724144211165284/Big_Ed_Crying_01092020170157.jpg`,
            `https://media.discordapp.net/attachments/743990939617460336/750022832716775482/Fun_Old_Duelist_Kaibel.PNG`,
            `https://media.discordapp.net/attachments/743990939617460336/751690557142597712/unknown.png`,
            `https://media.discordapp.net/attachments/612061367972790281/750004169166815332/We_Dont_Do_That_Here_31082020164836.jpg`,
            `https://media.discordapp.net/attachments/612061766830260244/749064446613258312/createcard.png`,
            `https://media.discordapp.net/attachments/612058753293877274/748257393216847912/unknown.png`,
            `https://media.discordapp.net/attachments/612063670297427978/748008228612472882/unknown.png`,
            `https://media.discordapp.net/attachments/612058753293877274/747994384049373205/Standup.png`,
            `https://i.imgur.com/sHEK2XQ.jpg`,
            `https://media.discordapp.net/attachments/612063895082762250/747607950377484368/image0.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/747483258702528632/EbZ8wmnXkAAALcc.png`,
            `https://media.discordapp.net/attachments/612063895082762250/746573594661748807/Takis_Enjoyer.png`,
            `https://media.discordapp.net/attachments/612058753293877274/746142006291595365/bobingytwo.png`,
            `https://media.discordapp.net/attachments/612063895082762250/743206885792022568/goiter.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/742944945383538938/IMG_20200811_201547.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/742816404927152188/donttalktomeormyson.png`,
            `https://media.discordapp.net/attachments/612058753293877274/737469778238767114/unknown.png`,
            `https://media.discordapp.net/attachments/612061766830260244/733518086463946792/sheik_flowchart.png`,
            `https://media.discordapp.net/attachments/612058753293877274/734476772690755624/Polish_20200719_112810651.jpg`,
            `https://media.discordapp.net/attachments/612063946643472389/734224095327027291/unknown.png`,
            `https://media.discordapp.net/attachments/612063895082762250/759152816870391868/unknown.png`,
            `https://media.discordapp.net/attachments/612061766830260244/759818077431922748/streamoment.png`,
            `https://media.discordapp.net/attachments/612063895082762250/757656587161698344/unknown.png`,
            `https://media.discordapp.net/attachments/612058753293877274/760597942116941832/IMG_20200929_222408.jpg`,
            `https://media.discordapp.net/attachments/612063895082762250/762668883999719454/4hdxwa.jpg`,
            `https://media.discordapp.net/attachments/612063895082762250/762706022233800744/podcasts.PNG`,
            `https://media.discordapp.net/attachments/612063895082762250/764400965717458954/image0.jpg`,
            `https://media.discordapp.net/attachments/612061198288027796/765271510041624656/unknown.png`,
            `https://media.discordapp.net/attachments/612061198288027796/765333134333444136/20201012_180026.png`,
            `https://media.discordapp.net/attachments/612061640694824960/767035706178404382/unknown.png`,
            `https://media.discordapp.net/attachments/612063895082762250/768547841760296960/20201020_152026.jpg`,
            `https://media.discordapp.net/attachments/612063895082762250/769333666484584448/20201023_185703.jpg`,
            `https://media.discordapp.net/attachments/612061766830260244/769350668980191262/unknown.png`,
            `https://media.discordapp.net/attachments/612061367972790281/769409431057858570/NotMad.png`,
            `https://media.discordapp.net/attachments/612063895082762250/770188642248818688/image0.jpg`,
            `https://media.discordapp.net/attachments/743696982589046854/770672309379530772/unknown.png`,
            `https://media.discordapp.net/attachments/612061652874952721/770692235522998383/unknown.png`,
            `https://media.discordapp.net/attachments/612061766830260244/770809602380005396/Casadpture.PNG`,
            `https://media.discordapp.net/attachments/612061640694824960/773742915796074526/for_streamo.png`,
            `https://media.discordapp.net/attachments/612063895082762250/775776234768171069/image0-1-3.gif`,
            `https://media.discordapp.net/attachments/612058753293877274/779070221461094431/whatwouldmeekdo.jpg`,
            `https://media.discordapp.net/attachments/743696982589046854/780520059806023690/take_it_easy.png`];

        var totalMemes = withText.length + images.length;

        var r = Math.floor((Math.random() * totalMemes));

        if (r <= withText.length) {
            message.channel.send(withText[r], {file: withTextImages[r]});
        } else {
            r = r - withText.length;
            message.channel.send({file: images[r]});
        }
    }


    //Pipe or Joint
    if (command === `PIPEORJOINT` || command === `PIPE` || command === `JOINT` || command === `YOOOOOHEDOBESCHMOKINTHO`) {
        var m = [`Pipe.`,
                `Joint.`];

        var r = Math.floor((Math.random() * m.length));

        message.channel.send(m[r]);
    }


    //Poo
    if (command === `POO` || command === `PEE`) {
        //368817136182886411 Drew's ID
        //246994286145437696 Ted's ID
        //262665230406909953 Streamo's ID

        //message.guild.members.get('262665230406909953').setNickname('Mother', 'of the stream variety').catch(e=>console.log(e));
        message.channel.send('peepeepoopoo');
    }

    //Results
    if (command === `RESULTS` || command === `RESULT`) {
        var text = [`Popoga Games #1`,
            `Popoga Games #2\n https://www.youtube.com/watch?v=RHc6QQxgUbk&feature=youtu.be`,
            `Popoga Games #3`,
            `Melty Mondays not on a Monday #1`,
            `Melty Mondays not on a Monday #2`,
            `Falcon RR`,
            `Popoga Games #6`,
            `Popoga Games #6`,
            `Poop Games (Popoga Games #7)`,
            `TCLE Games S1E2`,
            `Gen 5 Random Battles Tournament`,
            `Poop Games IDK`,
            `Team Stream Mommy vs Team Antiprompt Draft`];

        var images = [`https://cdn.discordapp.com/attachments/612061766830260244/706615425278148638/popoga_1_results.png`,
            ``,
            `https://cdn.discordapp.com/attachments/612061766830260244/713892124524806156/popoga_results_3_part_1.png https://cdn.discordapp.com/attachments/612061766830260244/713892135660945418/popoga_games_3_results_part_2.png`,
            `https://cdn.discordapp.com/attachments/615454765886996481/716404526604615730/once_again.png`,
            `https://cdn.discordapp.com/attachments/615454765886996481/718964545099661413/melty_blood_mondays_2.png`,
            `https://cdn.discordapp.com/attachments/612061766830260244/721140421585010688/unknown.png`,
            `https://cdn.discordapp.com/attachments/612061766830260244/724003659305975878/unknown.png`,
            `https://cdn.discordapp.com/attachments/612061766830260244/724015393487978578/popoga_lol.png`,
            `https://cdn.discordapp.com/attachments/612061766830260244/726541104085729320/poop_games_results.png`,
            `https://cdn.discordapp.com/attachments/612061766830260244/714904155667300445/unknown.png`,
            `https://media.discordapp.net/attachments/612063670297427978/753722571756929144/tourney_results_pic_showdown.png`,
            `https://media.discordapp.net/attachments/612061766830260244/749412294659670026/POOP_games_results_2.png`,
            `https://media.discordapp.net/attachments/612061766830260244/735303097508692048/ANTI_VS_STREAM_MOMMY_DRAFT.png`];

        var r = Math.floor((Math.random() * text.length));

        message.channel.send(text[r], {file: images[r]});
    }

    //Restingcarcass
    if (command === `RESTINGCARCASS` || command === `RESTING` || command === `MONKE` || command === `RC` || command === `CARC`) {
        //Up to date as of 9/25

        var monkes = [`https://media.discordapp.net/attachments/612058753293877274/733528498634752071/20200522_042255.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/733148876390793226/1ibh012n3ka51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/732086998738927656/itbwycxns6u41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/732803704217927760/Thentheresingapes_3c2fc78a5a77fb383bc36373eb61de46.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/732443789704036372/q6u4keycd2851.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/732086784045088818/pl1mdmi7v4z31.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/731709377077051472/eiqd5a1et4851.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/731499820396707870/SmartSelect_20200711-081849_Discord.jpg`,
            `https://media.discordapp.net/attachments/245037448378318849/731366871202267197/image0.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/731369014563045396/jo0abvjt6h851.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/730972716924010496/jal77sdznu851.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/730622017610711050/wi8fmbo3cs851.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/730253281485520946/pxxbgfdsa3951.png`,
            `https://media.discordapp.net/attachments/612058753293877274/729909888985333780/2wqztqpjio851.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/729536056634114099/ok48ofkvhdu41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/729197175765991494/cosji4rvrzw21.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/728812981097332786/h5o2t8bbac351.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/728448223223742483/hrhybpz7x0551.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/728101228499828818/j64bvqyr64851.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/727698201045368902/20200527_001412.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/726643100855828570/tb77l6m6b9751.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/726289907403849798/1593054420625.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/725904751555772426/qz5hpowj40a41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/725546847854395442/1oqzoputbn051.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/725188983298195497/rgjndhs1ars31.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/724834477800554567/jdyrddkw3c151.png`,
            `https://media.discordapp.net/attachments/612058753293877274/724467411574718474/49iq0j6vlhy41.gif`,
            `https://media.discordapp.net/attachments/612058753293877274/724113079012556930/en1ykfndrkj41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/723718798925889686/sxrw97202f451.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/723359278089502730/h9wq3egb7lm41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/717342601354674217/Funny-Monkeys-Funny-Monkey-Picture-120-FunnyPica.com_.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/722995888896737370/65qzi0orypl31.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/722654226240634950/zfiq6ex00s451.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/722278972712550417/s8nu7e2234941.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/721904604706504724/eqwiv0inad351.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/721554565262082068/086xgbhziuo31.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/721198510627618826/y1pllpxkrz051.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/720824903460454440/c3iw5yp4q1v41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/720469070763393134/seoqm1fxkd351.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/720126335661637702/k7wdyxzy2j351.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/719767648216547339/bwairjlw99541.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/719495966499143720/1dgntu1klcz41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/719008269682606130/awgl9gzuu2r31.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/718663861468921896/alg820yni9y21.png`,
            `https://media.discordapp.net/attachments/612058753293877274/718308367294267472/bziq2napba251.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/717928180299857990/429xswax9qe41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/717570240405438495/j0fy5g7yuiz41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/717192465886609498/hdfygqef1ow41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/716855777683439636/9upv4q6lwcy41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/716486745343918100/8phj3ya07w541.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/716134013730947082/cm1vt0jtfom31.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/715754320158523422/l0jargjahkf41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/715407962587529287/ynawmdkdzou41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/715053538706718761/ikghe3c3qus41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/714686451538984980/enh8xyxw0yv41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/714319062536159323/zv6dojqrrog41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/713968828882616350/wvnpzgavoxt41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/713583339151294474/i5iglkpjcj441.png`,
            `https://media.discordapp.net/attachments/612058753293877274/713232040505376768/84sie708o4y41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/712891718923452426/9mn5e4hymlu41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/712509925095637044/9tkzmxiydqp41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/712140339401719828/5np714wzeav41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/755997472073187368/Q1JCBqS.png`,
            `https://media.discordapp.net/attachments/612058753293877274/747299405752696852/monke.jpg`,
            `https://cdn.discordapp.com/attachments/612058753293877274/744047912769814568/l0ua317z9ee51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/741859513002623058/u94ha0mk2ge51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/741485901141770300/8vpcp4i8the51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/741120381557014608/k8hqu26oqtd51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/740761705000468499/sqr6jtw5lzd51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/739672909009911948/loqh83ruivc51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/739339836736929833/gsw0nj0hsuc51.png`,
            `https://media.discordapp.net/attachments/612058753293877274/738958174291361807/48j9qi153bc51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/738610002893340702/zbeu60q8frc51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/738221748817887292/xw7gmd4jd1c51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/737860420882137148/5psvxk17kub51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/736816647284719727/yg37df3q8r751.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/736401740131336282/dfe02omnd3c51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/735698650142998549/somwm82lu6c41.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/735325091675504712/1lhw6bbitr851.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/734981241056526426/6t1izpinyeb51.png`,
            `https://media.discordapp.net/attachments/612058753293877274/734604293491130399/bsupwbxq1ia51.png`,
            `https://media.discordapp.net/attachments/612058753293877274/734248433518510130/o7ktjzi8uw951.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/733899888978427914/dyejnitz8r851.jpg`,
            `https://cdn.discordapp.com/attachments/612058753293877274/779906910496882689/monke.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/774874293876162590/60i604j5itx51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/773395799353983026/980x.png`,
            `https://media.discordapp.net/attachments/612058753293877274/763612058767065088/38aqgc1soqr51.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/761426566461784074/74210993-6002-4819-8c41-ff3e53b24016.png`];

        var monkeVids = [`https://cdn.discordapp.com/attachments/612058753293877274/758866834857918504/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/758522357613985812/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/758184254822809610/monkey_spin.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/757811840242942022/monkeys.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/757433397881602098/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/757095529321725993/7cf1a8b1cbaef251b65bd0adcb29559db6d4b15c.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/756647567680339998/friday_monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/756347476167884911/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/755631451487338496/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/755258835207323708/043bd28e4aae50c016c20f3077d6e235073e7f84.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/754867454206804019/giphy.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/754568578832793682/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/754177337582419988/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/753803339937873950/8cd527e169eac31c3f5a9d70a49a2d9eb0ebca42.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/753446700508512256/a01ad464226f7bd16587854b07e707b4ee7c7820.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/753077687203135548/d19e5396c0200799ef473b2fdac9e5086bc55112.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/752742113615020032/ad6c67b15baef4471cf6303e8d6ccb0e36df3e7c.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/752378353276813322/4380674dd7a40dc69b75e0ca15c71fc3eb80d055.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/752013651157975080/d6e3a95bc50a7eb62bb5a33c482f656153b4ba13.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/751626683064254535/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/751279031126720663/8j7j2euidri51.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/750925519721070713/806d0bfe0e41f57c447785e7c68c8f76a5f299df.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/750557787007746058/ca6488d68de15fa1a8ed9eb189fe1222dbb6eb4e.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/750217205144092692/349ba0fad4a404cebd3d55d764b092ff552fdb8f.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/749826938083868762/650c1126c8c0264e2bd9893a69fddd0767b10b4c.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/749478439198785563/55ebb47cb37e0ec317f34f1c8cb9a4a26c1590fb.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/749100235111792670/TGIF_monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/748755254664888420/d6f570b06d2c288b71b9299704b32071d56abb3d.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/748387579707260928/1c24b84ebac7e9d42e68623b25369993930b2027.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/748011106232041562/80bd9aeb5bd4315f1b870b0d7cf6fedb79ead19d.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/747653495599136848/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/746921708115460178/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/746578644108968007/monke.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/746218256196698204/monke.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/745838730723590213/monke.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/745489742434664568/giphy_2.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/745120275674431548/monkey_hug.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/744767643059486770/monke.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/744428342954033172/200.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/743687229653909526/BetterAdoredCurlew-size_restricted.gif`,
            `https://media.discordapp.net/attachments/612058753293877274/743305151082791043/cpv8L73.gif`,
            `https://media.discordapp.net/attachments/612058753293877274/742948974704590899/686a11203f7833c86c3bf9c5cbe89ebc.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/742589207570153574/source.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/742222693566382121/44arabey5zf51.gif`,
            `https://media.discordapp.net/attachments/612058753293877274/737142901175484436/7qikf9pbgvb51.gif`,
            `https://media.discordapp.net/attachments/612058753293877274/736051227674017852/unnamed.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/775959997267705896/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/782126142760157184/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/781724080218570772/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/781395523415441478/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/781026785809661952/monke.webm`,
            `https://cdn.discordapp.com/attachments/612058753293877274/780629865618604082/monke.gif`,
            `https://cdn.discordapp.com/attachments/612058753293877274/780275016902115328/monke.webm`,
            `https://cdn.discordapp.com/attachments/612058753293877274/779565576058175518/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/779195022468972555/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/778828963870670889/monke.webm`,
            `https://cdn.discordapp.com/attachments/612058753293877274/778486566330564658/monke.webm`,
            `https://cdn.discordapp.com/attachments/612058753293877274/777733435224752128/monke.webm`,
            `https://cdn.discordapp.com/attachments/612058753293877274/777388266239688734/monke.webm`,
            `https://cdn.discordapp.com/attachments/612058753293877274/777018333265526794/monke.webm`,
            `https://cdn.discordapp.com/attachments/612058753293877274/776659524937187338/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/776295471437840384/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/775959997267705896/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/775572533659303946/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/775192805236408340/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/774466837710372894/monke_1.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/774466840814419968/monke_2.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/773754677924986960/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/773019157084110858/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/772676857086083092/monke2.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/772676862748524544/monke1.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/771924800574586950/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/771580262148210698/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/771200382993956894/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/770843637344108544/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/770484849244110879/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/770132002028126238/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/769785206121955338/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/769421003004051486/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/769035176952594442/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/768654256685056030/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/768304294277152788/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/767947617308246116/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/767619120992616459/close_gorilla.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/767228068074618912/monke_2.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/766880365943848971/monke_smokem.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/766507543559274506/coronamonke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/766133549346324500/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/765785950491377674/monke.webm`,
            `https://cdn.discordapp.com/attachments/612058753293877274/765406713779585055/monke_1.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/765049149161865276/gib1.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/764718829946667048/monke_2.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/764364521636364318/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/763960608927776778/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/763219404556730388/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/762890746511622194/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/762491770926923826/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/762171326793383936/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/761780482048262175/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/761053298530189342/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/760704621974388747/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/760343450494566450/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/759974503329169408/monke.mp4`,
            `https://cdn.discordapp.com/attachments/612058753293877274/759595344698146856/monke.mp4`];

        var totalLength = monkes.length + monkeVids.length;

        var r = Math.floor((Math.random() * totalLength));

        if (r <= monkes.length) {
            message.channel.send(`monke`, {file: monkes[r]});
        } else { //vid/gif
            r -= monkes.length;
            message.channel.send(`monke `+monkeVids[r]);
        }
    }

    //Risc
    if (command === `RISC` || command === `BESTDK` || command === `SCHEDULE` || command === `MONKEY` || command === `MONKY` || command === `MONKAY` || command === `SHMONKEY`) {
        var input = ["7:00 - we wake up to eat breakfast together, no cornflakes because cornflakes suck ",
"8:00 - we shower in shared bathrooms, except cael and airplane because they are minors. We all rub each others back for extra freshness ",
"8:30 - we pee together :)",
"8:45 - uh oh, time for school and work! While cael and airplane go to preschool, we adults go to uni, college or work to make money and learn something new!",
"13:00 - we have a collective skype session with lunch. Cael and airplane get some applesauce, sugden throws his vegetables off of his plate, darsh has a protein bar and the rest eats a sandwhich!",
"13:30 - uh oh! Naptime for airplane and cael! We sing a lullaby for them so they fall asleep through skype and we start studying and working again.",
"16:00 - its time to go home for a good session of lame melee, coffee and anti have been looking forward for this the whole day whole Darsh has prepared his sheik spiel against soap! Its wonderful!",
"18:30 - its time for dinner, after which we watch sesame street together and have a lot of fun :)",
"19:30 - airplane and cael will brush their teeth and go to bed while the rest are in a heated discussion which sesame street member has the most sex",
"20:00 - it is clear that big bird has the most sex. We start playing melee again!",
"22:30 - the non degens are slowly getting to bed, while Brio, A, Loscar, Anti and strucc are going to play a \"couple\" of dota games. Sugden stays awake to.try and convince them.to play melee, but alas, luckily soap is able to play sugden and they have the best (fd banned!) Fox dittos they could ask for",
"6:00 - AL fishing for halloween dogs to show up :point_down: :dog2:",
"6:30 - ALL DAY BABY",
"7:00 - Chandy trying to explain to TimCord while Mario Tennis is actually the best mario ever created",
"7:30 - soap :slight_smile: ing to hide the pain of maining a boring character as sheik",
"8:00 - Silver planning the next movienight whilst TimCord doesnt pay attention",
"8:30 - Darsh jerking himself off how cool his fadeback fairing ganon is",
"9:00 - Cag having sex with the 8th bitch of this week",
"9:30 - Loscar is teaching the children how to do drugs",
"10:00 - Airplane has locked himself in the bathroom and won’t come out",
"10:30 - Risc is arrested for doing racist impressions on the front lawn of the TimMansion",
"11:00 - we take Timmy and Sunny for a walk",
"11:30 - art time! we make our own memes :)",
"12:00 - we eat a late breakfast",
"12:30 - we take the zoomers on a field trip to the zoo",
"12:00 - we take extra time on the toilet to poo together as well",
"12:00 - AL is showing predatory behaviours towards weebs and burns down a Japanese village",
"12:00 - we die :)",
"13:00 - Sugden holds spotw voting",
"13:30 - we all go to wendy’s and get the 4 for 43",
"12:00 - Darsh gives advice to go the gym",
"12:00 - Darsh goes to the gym and secretly eats 3 cakes and cries",
"12:00 - Silver creates another event which immediately gets shot down",
"12:00 - Cael schedules his weekly MM and his boxx malfunctions",
"0:00 - Sugden swears he will sleep in a bit to stay awake for another 5 hours",
"3:30 - Sugden has been awake for 46 hours trying to fix his sleep schedule",
"14:00 - we play minecraft and stream mommy builds more dirt towers :)",
"19:30 - Sugden has been awake for roughly 6 days now to finish his Minecraft base",
"21:00 - bjartskular turns up for the timcord tourney to never be seen ever again",
"18:30 - airplane leaves timcord",
"18:31 - airplane joins timcord",
"15:00 - CPU fights! Sugden still hasn’t downloaded 20XX",
"5:25 - loscar joins voice chat while partying in a gay strip club",
"14:30 - AL invents a new word and it becomes a meme",
"13:00 - Risc meets a cute monky",
"15:30 - Sugden goes on a date but maintains his stance that he will never cum",
"16:00 - Sugden rants about how we should never cum and never do drugs",
"16:30 - we have pizza for dinner but airplane drops his on the floor, airplane moment!",
"14:00 - Loscar and Risc have life sciences club",
"14:01 - Loscar decides Life Sciences club was a bad idea",
"14:02 - Loscar leaves Life Sciences club",
"14:03 - Loscar Leaves Life",
"16:20 - We calculate the amount of Oreo'Os that fit in a coffee cup, it’s 216",
"18:00 - We eat an healthy dinner because airplane's mom cooked us some delicious rice :)",
"19:00 - Darsh and SubjectiveF reunite and talk about the good ol days",
"14:00 - Cael shows Timcord his new super deluxe beyblade and rips it like bubbles rips them underneath the sheets",
"22:30 - Darsh and SubjectiveF are drunk prank calling chandy about Starfox 64",
"23:00 - adlp is called to investigate drunk and dissorderly Boomers.",
"18:30 - we argue if falco laser is good, coriamon still says no",
"9:20 - /r/nwordsafespace is created",
"9:21 - /r/nwordsafespace is quarantined by reddit admins",
"12:00 - 3 more subreddits dedicated to calling out Draconitix as annoying are found",
"19:30 - we collectively shit on leffen for his latest tweet",
"20:00 - Mango wins a tournament! MANGO MANGO MANGO WOOOOOOO",
"16:00 - Darsh changes his spiel from Sheik to Fox to Coffee back to Sheik",
"22:30 - KARAOKE TIME WITH THE BOYS",
"23:00 - we all read worm together :)",
"9999:00 - we all finish reading worm",
"9999:01 - heat death of the universe",
"14:00 - MPGR top 40 is released, not the rankings the top 40 songs that PTAS likes",
"17:33 - Silver changes mains to Doc and changes his tag to Pillusion",
"44:12 - Chat is moving so fast no one will see I’m not gay anymore thanks to obama the healing power of jesus christ. (same guy)",
"14:88 - Nico, nico, ni****",
"1:00 - lole",
"2:00 - :geg:",
"2:00 - :grab2: :geg:",
"2:00 - :yey:",
"2:00 - :eye:",
"2:00 - :yey: :eye::yey:",
"2:30 - stream mommy has a hot take",
"Never - stream mommy has a good take",
"3:15 - Sugden has the flu",
"3:20 - Winnarly is heard telling Brio that they have to go to Midnights",
"3:25 - Brio is too busy on a gungeon run and stays",
"3:40 - Midnight is heard on Brio’s Mic asking where Winnarly is",
"3:50 - Silver is heard on Midnight’s mic and tells Brio that Midnight is looking for him",
"4:00 - Brio starts eating pizza",
"5:00 - Brio is halfway done eating pizza",
"6:00 - dimi comes back online but he is in france again because Paris has his heart",
"8:00 - dimi realizes he can’t afford france and has to live in Nice",
"9:00 - Drew asks about mixtape signups, he’s already signed up five times",
"9:10 - a joke goes over Drew’s head",
"10:00 - Rootnut finally snaps and murders his roommate for Rocket Leaguing too loudly",
"11:00 - adlp and rootnut cover up the murder",
"12:00 - Rootnut gets the best sleep of his life",
"11:11 - Coriamon has no comment about the Nightmare situation",
"17:00 - Risc is planning yet another TimCord meetup, no one attends",
"13:50 - Cael and Rognut make a porno uh oh stinky",
"15:30 - Project cancelled because cael’s internet is shut off by his parents",
"15:45 - Project M is cancelled again",
"16:00 - soap is caught stealing candy from airplane! Oh no!",
"10:00 - DeadCord",
"10:00 - Sorry, we just had a big lunch! :slight_smile: :+1:",
"18:00 - ||you hate to see it||",
"16:30 - Silver starts another candy event and half the server ~~leaves~~ dies",
"23:30 - IceMaster joins voice chat",
"8:50 - IceMaster stays on voice chat for 19 hours and says nothing ",
"19:30 - IceMaster crabs after a month of absence, he rolls a 10.",
"7:15 - we all do our morning crab :)",
"3:45 - AL is unhackable because he runs linux like an idiot",
"3:46 - AL installs windows so he can netplay",
"3:47 - AL gets hacked",
"5:45 - airplane joins voice, asks if anyone is playing, and leaves after 2 seconds",
"4:00 - Loscar becomes unhackable because he switches to system33",
"6:15 - we watch the stream of the first nigerian melee tournament!",
"3:59 - Loscar is unhackable because he is homeless because he spends all day shitposting",
"8:15 - a group of spies raid the Tederal Reserve and all TedCoin is lost",
"8:20 - Ted deletes a random discord server",
"8:30 - funds sent towards the first nigerian melee tournament get lost because they do not accept TimCoin as a valid currency.",
"18:00 - we make a second Sugden Appreciation Server :)",
"11:15 - a girl at school gives cael a tamagotchi",
"14:30 - cael wins his first beyblade tournament",
"17:20 - cael goes 0-2 at a beyblade local",
"16:30 - Coffee goes to a local and loses to 2 random fox mains",
"17:00 - protests are held to disband the dictatorship which is TimCord. It fails, horribly.",
"21:37 - Goloche is forgotten to be included in the !risc command",
"16:10 - cael's mom finds the olive oil",
"14:00 - RootNut is streaming PoE, but no one watches.",
"20:20 - Sugden fell down a well! oh no!",
"21:00 - uh oh, stinky!",
"23:15 - stream mommy starts a semantics argument",
"0:30 - Sugden is outed as a white nationalist",
"9:30 - Icemaster writes <:Popoga:648637180964634642>  in every channel",
"7:15 - FloatyApologist announces his 5-step plan to kill all fastfallers",
"10:00 - we all speedrun super mario world lu1g1%",
"16:20 - Stream Mommy talks about weed. Again.",
"10:00 - everyone argues about #CumChallenge2k20 seeding",
"18:20 - Darsh goes to work out. Cael, Sugden, and Stream Mommy go with him.",
"23:10 - AL, Struc, and Dimi play final fantasy",
"14:00 - Bjart is elected cum champ",
"17:30 - Darsh’s wife gets on voice chat and everyone questions her",
"6:9 - Sugden, Stream Mommy, dimi, Bubbles, Midight, Silver and ADLP all play MW2",
"11:30 - Soap releases his all peach combo video and brings Armada out of retirement.",
"13:30 - Risc guilts someone into changing their pfp into a black person for a week",
"8:45 - Cael posts hentai and gets banned for a day",
"13:10 - Farmstink releases a new fanfic",
"12:00 - Coffee has an epiphany about melee and switches to Fox.",
"16:33 - Wub and Marge play Project+",
"19:00 - Restingcarcass breaks both of his arms. Again.",
"3:30 - The book club starts reading Mein Kampf",
"00:00 - dimi time",
"3:57 - Flapo and Cag have a wonderful discussion about the merits of crouch cancel; Cag smokes 2 joints and a bowl",
"21:20 - Sugden nukes the server <:geg:659862247702528055> ",
"19:00 - dimi has consumed two bottles of wine and is ready to talk about sheik",
"10:45 - We all do a mixtape swap. It’s very fun.",
"8:00 - Darsh deletes :popoga: and blames it on Sugden.",
"19:00 - Loscar stages a heist on the YL character discord.",
"15:40 - Ted comes back and rants to no one in particular about monster designs",
"7:10 - DuckNumbers posts that he just jacked off",
"8:40 - Cael Caelposts",
"7:00 - Flapo overdoses on heroin in voice chat and sees Hungrybox in the light",
"14:00 - Sugden takes a very painful shit and posts about it in Timcord",
"13:00 - AL and dimi debate the merits of nuclear warfare with Israel; Sugden remains silent",
"19:15 - <:popperga:659868423551189012> :pinching_hand: <a:dimi:614821651812581403>",
"10:00 - Dimi successfully convinces the Melee Backroom to ban Zelda from future events",
"12:00 - Anti wins the presidential debate by responding in latin to every question",
"11:00 - Anti streams Dark Souls and everyone makes fun of him",
"21:20 - SubF comes back to watch a dark souls stream",
"17:59 - <a:672644471439228938:692228896602587156>",
"15:30 - We all have to social distance because stream mommy got coronavirus",
"14:30 - We all have to social distance because stream mommy is here in general",
"9:00 - After a near death experience, Sugden decided to unban puff",
"11:15 - I kid you not, he turns himself into a pickle. He’s called Pickle Risc, funniest shit I’ve ever seen."];

        var finalOutput = '';

        var min = Math.ceil(5);
        var max = Math.floor(15);
        var r = Math.floor(Math.random() * (max - min + 1)) + min;

        //var r = Math.floor((Math.random() * 14));

        for (var i = 0; i < r; i++) {
            var min2 = Math.ceil(5);
            var max2 = Math.floor(25);
            var r2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;

            let markov = new MarkovGen({
                input: input,
                minLength: r2
            });

            var result = markov.makeChain();
            finalOutput += result;
            finalOutput += '\n';
        }

        message.channel.send(''+finalOutput);
    }

    //Rognut
    if (command === `ROGNUT` || command === `ROG` || command === `ROGCHAMP`) {
        var g = [`https://media.discordapp.net/attachments/612058753293877274/674681307518730286/JPEG_20200205_132305.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/674680777614688287/JPEG_20200205_132121.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/672610167602413599/JPEG_20200130_201313.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/672609418482941962/image0.png`,
            `https://media.discordapp.net/attachments/612058753293877274/672608673776009217/JPEG_20200130_200717.jpg`,
            `https://media.discordapp.net/attachments/612058753293877274/671794541635960832/20200128_141120.png`];

        var r = Math.floor((Math.random() * g.length));

        message.channel.send({file: g[r]});

        //message.channel.send(`rog would love to be cucked way more than midnight`);
    }

    //Rootnut
    if (command === `ROOT` || command === `ROOTNUT` || command === `NUT` || command === `DESVELATE`) {
        var min2 = Math.ceil(15);
        var max2 = Math.floor(99);
        var r2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;

        message.channel.send(`Has made `+r2+` PoE builds and counting this league\n\nThey're all facebreakers`);
    }

    //Sailormercury
    if (command === `REPLYGUY` || command === `:REPLYGUY:` || command === `SM` || command === `MERCURY` || command === `SAILOR` || command === `SAILORMERCURY` || command === `REDSHEIK`) {
        message.channel.send(`I MADE THE FUCKING POST\nFUCK you. I **FUCKING** HATE YOU. FUCK you.\nFUCK YOU.`);
    }

    //Scramble
    if (command === `SCRAMBLE` || command === `CUBE` || command === `SCROMBLE` || command === `CBUE` || command === `SCRIMBLE` || command === `BOJANGLE` || command === `DONGLE`) {
        var scramble = cube.type("333").length(20).get(1);

        message.channel.send(scramble+`\n:kaaba:`);
    }

    //Tile
    if (command === `TILE` || command === `FLOOR`) {
        var t = [`https://media.discordapp.net/attachments/612061640694824960/673327572708491303/15806042302255384021958079595329.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673314105691734017/15806010195687221104511334223486.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673313842117476372/15806009543288308072310155686759.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673313479767228416/15806008702924131087890219342463.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673312890945667132/15806007287708778533342030841650.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673312512502005763/image0.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673312468533248000/15806006295215554648947677547880.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673312056832819212/15806005310116913964166639841313.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673311824288153653/unknown.png`,
            `https://media.discordapp.net/attachments/612061640694824960/673311684034691077/15806004421144866487428552109326.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673311617600978964/1580600426412741230542678767593.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673311491935567872/15806003958987549145147463313617.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673311380253835294/15806003684681025610078758264421.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673311239367032892/15806003363483341304416884100057.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673311168781221918/1580600319149275052331417400346.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673311106911174658/15806003049528534478934777921074.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673310990208860170/15806002750043341241351913281017.jpg`,
            `https://media.discordapp.net/attachments/612061640694824960/673310880112574464/15806002498328475685968709642649.jpg`]

        var r = Math.floor((Math.random() * t.length));

        message.channel.send({file: t[r]});
    }

    //Time
    if (command === `TIME` || command === `TIMEZONE` || command === `TIMEZONES` || command === `DIMITIME`) {
        //var aestTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
        //aestTime = new Date(aestTime);
        //console.log('AEST time: '+aestTime.toLocaleString())

        var dimiTime = new Date().toLocaleString("en-US", {timeZone: "America/Araguaina"});
        dimiTime = new Date(dimiTime);

        var britishTime = new Date().toLocaleString("en-GB", {timeZone: "Europe/London"});
        britishTime = new Date(britishTime);

        var netherlandsTime = new Date().toLocaleString("en-US", {timeZone: "Europe/Amsterdam"});
        netherlandsTime = new Date(netherlandsTime);

        var easternTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
        easternTime = new Date(easternTime);

        var centralTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
        centralTime = new Date(centralTime);

        var pacificTime = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
        pacificTime = new Date(pacificTime);

        var newfoundlandTime = new Date().toLocaleString("en-US", {timeZone: "America/St_Johns"});
        newfoundlandTime = new Date(newfoundlandTime);

        message.channel.send(`**Dimi Time:** `+dimiTime.toLocaleTimeString()+` (now)\n**British Dimi Time:** `+britishTime.toLocaleTimeString()+`\n**Netherlands Dimi Time:** `+netherlandsTime.toLocaleTimeString()+`\n**Newfoundland Dimi Time:** `+newfoundlandTime.toLocaleTimeString()+`\n**Eastern Dimi Time:** `+easternTime.toLocaleTimeString()+`\n**Central Dimi Time:** `+centralTime.toLocaleTimeString()+`\n**Pacific Dimi Time:** `+pacificTime.toLocaleTimeString());
    }

    //SFAT
    if (command === `SFAT` || command === `ZAC`) {
        message.channel.send({ file: `https://cdn.discordapp.com/attachments/612063670297427978/650057908851179553/unknown.png` });
    }

    //Silverhand
    if (command === `SILVER` || command === `SILVERHAND` || command === `ILVER` || command === `LVER` || command === `ILLUSION` || command === `MOVIE`) {
        /*var r = Math.random() * 16; //OLD COMMAND

        if (r <= 3) {
            var m = [`https://i.imgur.com/VBB57cT.png`,
                    `https://i.imgur.com/U5RNamy.png`,
                    `https://media.discordapp.net/attachments/612058753293877274/677563746457223178/Cat_Sniping_Crying_Cat_13022020181616.jpg`];

            var r = Math.floor((Math.random() * m.length));

            message.channel.send({file: m[r]});

        } else {
            var h = [`wanna play guilty gear`,
                    `wanna play melty`,
                    `wanna play unist`,
                    `OK I'm starting an Ultra Fight Da! Kyanta 2 league. You guys should join in \ntype in \` t!ultrafightdakyanta2league \` to join`,
                    `**\*Loud typing noises\***`,
                    `**\*Loud Fightstick noises\***`,
                    `Nooo don't shut down the bot your so sexy aha`,
                    `Long overdue, but I think it's time for me to unsubscribe from this server.`,
                    `What if Silver sex Ky Kiske from the new Guilty Gear trailer`,
                    `Hi, at the time of you reading this I am taking an indefinite break from the scene and taking this puff along with me. I'll get straight to the point, Leffen has been an asshole to me and my character countless times, and shows no remorse or effort to change. I'm sure he or someone else will try to spin my absence as being about what happened right before I got eliminated, or some other small thing, but that was just the straw that broke the clutchgod's back. He is a hurtful person to be around, and has gone so far as blatantly saying so. A point he made the day I'm writing this that really pushed me towards leaving is that he doesn't single me out, he's just like this to everyone. I don't think any of you deserve to be around people like that. Leaving was a very hard decision to make, as I've spent a lot of my time with this scene the past decade, and if it were just the rest of you I'd love to continue to do so. However, people defending someone who is that awful to be around outweighs the other benefits of being in this community, at least to me. I hope that something can change, whether that is Leffen showing real effort to change as a person and be nicer to people, or him leaving the server. If not, it's been nice knowing the rest of you, and my DMs are open if anyone wants to get in touch with me. \n \n-Hungrybox`,
                    `Hi, at the time of you reading this I am taking an indefinite break from the server and taking this bot along with me. I'll get straight to the point, SubjectiveF has been an asshole to me and my friends countless times, and shows no remorse or effort to change. I'm sure he or someone else will try to spin my absence as being about what happened right before I left, or some other small thing, but that was just the straw that broke the camel's back. He is a hurtful person to be around, and has gone so far as blatantly saying so. A point he made the day I'm writing this that really pushed me towards leaving is that he doesn't single me out, he's just like this to everyone. I don't think any of you deserve to be around people like that. Leaving was a very hard decision to make, as I've spent a lot of my time with this server the past few months, and if it were just the rest of you I'd love to continue to do so. However, people defending someone who is that awful to be around outweighs the other benefits of being in this community, at least to me. I hope that something can change, whether that is Subjective showing real effort to change as a person and be nicer to people, or him leaving the server. If not, it's been nice knowing the rest of you, and my DMs are open if anyone wants to get in touch with me. \n \n-I'm gay`,
                    `wanna play tekken`,
                    `Hi, at the time of you reading this I am taking an indefinite break from the server and taking this bot along with me. I'll get straight to the point, AnimeLover has been an asshole to me and my friends countless times, and shows no remorse or effort to change. I'm sure he or someone else will try to spin my absence as being about what happened right before I left, or some other small thing, but that was just the straw that broke the camel's back. He is a dumb fucking person to be around, and has gone so far as blatantly acting like a tard. A point he made the day I'm writing this that really pushed me towards leaving is that he doesn't single me out, he's just like this to everyone. I don't think any of you deserve to be around people like that. Leaving was a very hard decision to make, as I've spent a lot of my time with this server the past few months, and if it were just the rest of you I'd love to continue to do so. However, people defending someone who is that awful to be around outweighs the other benefits of being in this community, at least to me. I hope that something can change, whether that is this fucking idiot showing real effort to change as a person and be nicer to people, or him leaving the server. If not, it's been nice knowing the rest of you, and my DMs are open if anyone wants to get in touch with me.\n\n- Swag out, pimps!`];

            var r = Math.floor((Math.random() * h.length));

            message.channel.send(h[r]);
        }*/

        //New command/movie recs
        /*var movies = [`Al Pacino is in one room talking for two hours and it's one of the most tense and entertaining films I've seen\nhttps://letterboxd.com/film/dog-day-afternoon/`,
            `The classic fairy tale movie, if you haven't already seen this at least 10 times I feel sorry for you\nhttps://letterboxd.com/film/the-princess-bride/`,
            `Batman, but he's a ninja. Batman Ninja. It's hilarious.\nhttps://letterboxd.com/film/batman-ninja/`,
            `Slow paced drama about pursuing your passions. Very comforting, with amazing cinematography\nhttps://letterboxd.com/film/columbus-2017/`,
            `A modern take on the classic murder mystery. Very fun and rewatchable\nhttps://letterboxd.com/film/knives-out-2019/`,
            `Very sad but beautiful movie, with some great performances\nhttps://letterboxd.com/film/lost-in-translation/`,
            `Probably the best horror movie\nhttps://letterboxd.com/film/the-shining/`,
            `Amazing animation and one of my favorite soundtracks of the past few years\nhttps://letterboxd.com/film/i-lost-my-body/`,
            `Great mystery thriller, and proof that Ben Affleck can act well, he just chooses not to\nhttps://letterboxd.com/film/gone-girl/`,
            `One of the best action movies ever, non-stop insanely cool scenes back to back\nhttps://letterboxd.com/film/john-wick-chapter-3-parabellum/`,
            `Top two most misunderstood movies of all time, it's a masterpiece\nhttps://letterboxd.com/film/the-village/`,
            `One of my favorite mystery movies, very fun\nhttps://letterboxd.com/film/the-girl-with-the-dragon-tattoo-2011/`,
            `haha silver's a normie he put parasite on his movies list\nhttps://letterboxd.com/film/parasite-2019/`,
            `Very good if you like chill dialogue-heavy movies\nhttps://letterboxd.com/film/once-upon-a-time-in-hollywood/`,
            `Honestly still can't believe this movie exists. It's great\nhttps://letterboxd.com/film/rango/`,
            `Possibly my favorite action movie, and one of Philip Seymour Hoffman's best performances\nhttps://letterboxd.com/film/mission-impossible-iii/`,
            `Standin entry for the whole trilogy. Go spend 12 hours watching the extended cuts, it's worth it\nhttps://letterboxd.com/film/the-lord-of-the-rings-the-fellowship-of-the-ring/`,
            `Incredibly tense and beautiful thriller. The story feels very grounded/realistic\nhttps://letterboxd.com/film/thoroughbreds-2017/`,
            `The only thing I understand for sure about this film is that Charlie Kaufman is a genius\nhttps://letterboxd.com/film/synecdoche-new-york/`,
            `Very fun stop motion animation, great voice cast. Maybe the most Wes Anderson movie, if not his best\nhttps://letterboxd.com/film/fantastic-mr-fox/`,
            `It's a masterpiece. Why can't more horror/thriller movies just copy this?\nhttps://letterboxd.com/film/the-silence-of-the-lambs/`,
            `Walks a very thin line between heartbreaking and comedic, one of my favorite Wes Anderson films\nhttps://letterboxd.com/film/the-royal-tenenbaums/`,
            `Really cool use of animation, this story wouldn't work in any other format. Also typically very good writing/direction from Charlie Kaufman\nhttps://letterboxd.com/film/anomalisa/`,
            `Nolan makes loud space noises and it's very good\nhttps://letterboxd.com/film/interstellar/`,
            `One of my favorite twists in any film, and fantastic performances from everyone here\nhttps://letterboxd.com/film/the-prestige/`,
            `One of my favorite films, fantastic mystery and simultaneously a great character study\nhttps://letterboxd.com/film/zodiac/`,
            `Antiprompt btfo\nhttps://letterboxd.com/film/there-will-be-blood/`,
            `Still shocked this is good at all, but it's amazing. Very warm and happy feels\nhttps://letterboxd.com/film/paddington-2/`,
            `Killing nazis is cool\nhttps://letterboxd.com/film/inglourious-basterds/`,
            `Some of the best fight scenes ever, and has a super cool style. Better than Vol. 2, fight me.\nhttps://letterboxd.com/film/kill-bill-vol-1/`,
            `Outstanding animation and a very touching story, some of the best of Pixar doing what they do well\nhttps://letterboxd.com/film/coco-2017/`,
            `The best Robin Williams movie, everyone should see this\nhttps://letterboxd.com/film/dead-poets-society/`,
            `I watched this so many times as a kid and it still holds up really well\nhttps://letterboxd.com/film/the-iron-giant/`,
            `Fantastic animation and really creepy, idk how this got passed off as a "kids movie"\nhttps://letterboxd.com/film/coraline/`,
            `:heart_eyes: \nhttps://letterboxd.com/film/blade-runner-2049/`,
            `It's a war movie and I don't hate it, must be doing something right\nhttps://letterboxd.com/film/dunkirk-2017/`,
            `One of the best superhero films ever, the antithesis to modern marvel\nhttps://letterboxd.com/film/spider-man-2/`,
            `Hilarious and charming mini-series, probably the only non-movie in this list\nhttps://letterboxd.com/film/over-the-garden-wall-2014/`,
            `One of the most stressful things I've ever seen. Couldn't watch it again, but it's great\nhttps://letterboxd.com/film/room-2015/`,
            `I like time travel films. If you don't, you'll probably hate this. It's really fun though\nhttps://letterboxd.com/film/looper/`,
            `monke\nhttps://letterboxd.com/film/rise-of-the-planet-of-the-apes/`,
            `Kevin Spacey is a creep, just like in real life. Still a good movie though\nhttps://letterboxd.com/film/american-beauty/`,
            `One of my favorites, Villeneueve is a genius\nhttps://letterboxd.com/film/arrival-2016/`,
            `Absolute classic, basically flawless\nhttps://letterboxd.com/film/12-angry-men/`,
            `Long takes are really cool\nhttps://letterboxd.com/film/birdman-or-the-unexpected-virtue-of-ignorance/`,
            `Best christmas movie, and one of the best action movies.\nhttps://letterboxd.com/film/die-hard/`,
            `My favorite movie about capitalism\nhttps://letterboxd.com/film/nightcrawler/`,
            `One of the best coming of age movies\nhttps://letterboxd.com/film/adventureland/`,
            `One of my favorites\nhttps://letterboxd.com/film/ex-machina-2014/`,
            `Top two most misunderstood movies of all time. It's so fucking good\nhttps://letterboxd.com/film/speed-racer/`,
            `Slowly realizing that I'm just going to put every Wes Anderson movie on this list\nhttps://letterboxd.com/film/the-grand-budapest-hotel/`,
            `Maybe my favorite Wes Anderson film, rare example of non-annoying child actors\nhttps://letterboxd.com/film/moonrise-kingdom/`//,
            /*`https://letterboxd.com/film/eternal-sunshine-of-the-spotless-mind/`,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``,
            ``*///];

        var movies = [`https://letterboxd.com/film/dog-day-afternoon/`,
            `https://letterboxd.com/film/borat-subsequent-moviefilm/`,
            `https://letterboxd.com/film/the-princess-bride/`,
            `https://letterboxd.com/film/batman-ninja/`,
            `https://letterboxd.com/film/columbus-2017/`,
            `https://letterboxd.com/film/knives-out-2019/`,
            `https://letterboxd.com/film/lost-in-translation/`,
            `https://letterboxd.com/film/the-shining/`,
            `https://letterboxd.com/film/i-lost-my-body/`,
            `https://letterboxd.com/film/gone-girl/`,
            `https://letterboxd.com/film/john-wick-chapter-3-parabellum/`,
            `https://letterboxd.com/film/the-village/`,
            `https://letterboxd.com/film/the-girl-with-the-dragon-tattoo-2011/`,
            `https://letterboxd.com/film/parasite-2019/`,
            `https://letterboxd.com/film/once-upon-a-time-in-hollywood/`,
            `https://letterboxd.com/film/rango/`,
            `https://letterboxd.com/film/mission-impossible-iii/`,
            `https://letterboxd.com/film/the-lord-of-the-rings-the-return-of-the-king/`,
            `https://letterboxd.com/film/the-lord-of-the-rings-the-two-towers/`,
            `https://letterboxd.com/film/the-lord-of-the-rings-the-fellowship-of-the-ring/`,
            `https://letterboxd.com/film/thoroughbreds-2017/`,
            `https://letterboxd.com/film/synecdoche-new-york/`,
            `https://letterboxd.com/film/fantastic-mr-fox/`,
            `https://letterboxd.com/film/the-silence-of-the-lambs/`,
            `https://letterboxd.com/film/the-royal-tenenbaums/`,
            `https://letterboxd.com/film/anomalisa/`,
            `https://letterboxd.com/film/interstellar/`,
            `https://letterboxd.com/film/the-prestige/`,
            `https://letterboxd.com/film/zodiac/`,
            `https://letterboxd.com/film/there-will-be-blood/`,
            `https://letterboxd.com/film/paddington-2/`,
            `https://letterboxd.com/film/inglourious-basterds/`,
            `https://letterboxd.com/film/kill-bill-vol-1/`,
            `https://letterboxd.com/film/coco-2017/`,
            `https://letterboxd.com/film/dead-poets-society/`,
            `https://letterboxd.com/film/the-iron-giant/`,
            `https://letterboxd.com/film/coraline/`,
            `https://letterboxd.com/film/blade-runner-2049/`,
            `https://letterboxd.com/film/dunkirk-2017/`,
            `https://letterboxd.com/film/dunkirk-2017/`,
            `https://letterboxd.com/film/over-the-garden-wall-2014/`,
            `https://letterboxd.com/film/room-2015/`,
            `https://letterboxd.com/film/looper/`,
            `https://letterboxd.com/film/rise-of-the-planet-of-the-apes/`,
            `https://letterboxd.com/film/american-beauty/`,
            `https://letterboxd.com/film/arrival-2016/`,
            `https://letterboxd.com/film/12-angry-men/`,
            `https://letterboxd.com/film/birdman-or-the-unexpected-virtue-of-ignorance/`,
            `https://letterboxd.com/film/die-hard/`,
            `https://letterboxd.com/film/nightcrawler/`,
            `https://letterboxd.com/film/adventureland/`,
            `https://letterboxd.com/film/ex-machina-2014/`,
            `https://letterboxd.com/film/speed-racer/`,
            `https://letterboxd.com/film/the-grand-budapest-hotel/`,
            `https://letterboxd.com/film/moonrise-kingdom/`,
            `https://letterboxd.com/film/eternal-sunshine-of-the-spotless-mind/`,
            `https://letterboxd.com/film/django-unchained/`,
            `https://letterboxd.com/film/ratatouille/`,
            `https://letterboxd.com/film/walle/`,
            `https://letterboxd.com/film/howls-moving-castle/`,
            `https://letterboxd.com/film/spirited-away/`,
            `https://letterboxd.com/film/mad-max-fury-road/`,
            `https://letterboxd.com/film/the-shawshank-redemption/`,
            `https://letterboxd.com/film/little-miss-sunshine/`,
            `https://letterboxd.com/film/district-9/`,
            `https://letterboxd.com/film/ferris-buellers-day-off/`,
            `https://letterboxd.com/film/the-truman-show/`,
            `https://letterboxd.com/film/good-will-hunting/`,
            `https://letterboxd.com/film/return-of-the-jedi/`,
            `https://letterboxd.com/film/the-empire-strikes-back/`,
            `https://letterboxd.com/film/star-wars/`,
            `https://letterboxd.com/film/the-dark-knight/`,
            `https://letterboxd.com/film/batman-begins/`,
            `https://letterboxd.com/film/her/`,
            `https://letterboxd.com/film/inception/`,
            `https://letterboxd.com/film/prisoners/`,
            `https://letterboxd.com/film/the-wolf-of-snow-hollow/`,
            `https://letterboxd.com/film/monos/`,
            `https://letterboxd.com/film/the-lighthouse-2019/`,
            `https://letterboxd.com/film/im-thinking-of-ending-things/`,
            `https://letterboxd.com/film/millennium-actress/`,
            `https://letterboxd.com/film/batman-under-the-red-hood/`,
            `https://letterboxd.com/film/the-good-the-bad-and-the-ugly/`,
            `https://letterboxd.com/film/booksmart/`,
            `https://letterboxd.com/film/the-lives-of-others/`,
            `https://letterboxd.com/film/sorry-to-bother-you/`,
            `https://letterboxd.com/film/hero-2002/`,
            `https://letterboxd.com/film/good-time/`,
            `https://letterboxd.com/film/mary-and-max/`,
            `https://letterboxd.com/film/megamind/`,
            `https://letterboxd.com/film/the-hidden-fortress/`,
            `https://letterboxd.com/film/enemy/`,
            `https://letterboxd.com/film/rushmore/`,
            `https://letterboxd.com/film/jojo-rabbit/`,
            `https://letterboxd.com/film/in-bruges/`,
            `https://letterboxd.com/film/midnight-in-paris/`,
            `https://letterboxd.com/film/mission-impossible-fallout/`,
            `https://letterboxd.com/film/spider-man-into-the-spider-verse/`,
            `https://letterboxd.com/film/the-incredibles/`,
            `https://letterboxd.com/film/oldboy/`,
            `https://letterboxd.com/film/when-marnie-was-there/`,
            `https://letterboxd.com/film/from-up-on-poppy-hill/`,
            `https://letterboxd.com/film/whisper-of-the-heart/`,
            `https://letterboxd.com/film/kikis-delivery-service/`,
            `https://letterboxd.com/film/nausicaa-of-the-valley-of-the-wind/`,
            `https://letterboxd.com/film/american-animals/`,
            `https://letterboxd.com/film/skyfall/`,
            `https://letterboxd.com/film/no-country-for-old-men/`,
            `https://letterboxd.com/film/the-endless/`,
            `https://letterboxd.com/film/isle-of-dogs-2018/`,
            `https://letterboxd.com/film/robot-frank/`,
            `https://letterboxd.com/film/back-to-the-future-part-ii/`,
            `https://letterboxd.com/film/get-out-2017/`,
            `https://letterboxd.com/film/the-shape-of-water/`,
            `https://letterboxd.com/film/pulp-fiction/`,
            `https://letterboxd.com/film/memento/`,
            `https://letterboxd.com/film/goodfellas/`,
            `https://letterboxd.com/film/jin-roh-the-wolf-brigade/`,
            `https://letterboxd.com/film/the-dark-knight-rises/`,
            `https://letterboxd.com/film/perfect-blue/`,
            `https://letterboxd.com/film/reservoir-dogs/`,
            `https://letterboxd.com/film/harry-potter-and-the-prisoner-of-azkaban/`,
            `https://letterboxd.com/film/airplane/`,
            `https://letterboxd.com/film/war-for-the-planet-of-the-apes/`,
            `https://letterboxd.com/film/logan-2017/`,
            `https://letterboxd.com/film/madagascar-escape-2-africa/`,
            `https://letterboxd.com/film/dawn-of-the-planet-of-the-apes/`,
            `https://letterboxd.com/film/scott-pilgrim-vs-the-world/`,
            `https://letterboxd.com/film/the-book-of-eli/`,
            `https://letterboxd.com/film/princess-mononoke/`,
            `https://letterboxd.com/film/guardians-of-the-galaxy/`,
            `https://letterboxd.com/film/blades-of-glory/`,
            `https://letterboxd.com/film/napoleon-dynamite/`,
            `https://letterboxd.com/film/moon/`,
            `https://letterboxd.com/film/what-we-do-in-the-shadows/`,
            `https://letterboxd.com/film/star-trek-beyond/`,
            `https://letterboxd.com/film/where-the-wild-things-are/`,
            `https://letterboxd.com/film/catch-me-if-you-can-2002/`,
            `https://letterboxd.com/film/dracula-1992/`,
            `https://letterboxd.com/film/children-of-men/`,
            `https://letterboxd.com/film/brother-1997/`,
            `https://letterboxd.com/film/ernest-celestine/`,
            `https://letterboxd.com/film/stand-by-me/`,
            `https://letterboxd.com/film/primer/`,
            `https://letterboxd.com/film/batman-beyond-return-of-the-joker/`,
            `https://letterboxd.com/film/brazil/`,
            `https://letterboxd.com/film/palm-springs-2020/`,
            `https://letterboxd.com/film/psycho/`,
            `https://letterboxd.com/film/akira/`,
            `https://letterboxd.com/film/sunshine-2007/`,
            `https://letterboxd.com/film/the-worlds-end/`,
            `https://letterboxd.com/film/black-dynamite/`,
            `https://letterboxd.com/film/rear-window/`,
            `https://letterboxd.com/film/uncut-gems/`,
            `https://letterboxd.com/film/home-alone/`,
            `https://letterboxd.com/film/home-alone-2-lost-in-new-york/`,
            `https://letterboxd.com/film/ghost-in-the-shell/`,
            `https://letterboxd.com/film/castle-in-the-sky/`,
            `https://letterboxd.com/film/lupin-the-third-the-castle-of-cagliostro/`,
            `https://letterboxd.com/film/nocturnal-animals/`,
            `https://letterboxd.com/film/paddington/`,
            `https://letterboxd.com/film/man-on-the-moon/`,
            `https://letterboxd.com/film/hail-caesar-2016/`,
            `https://letterboxd.com/film/how-the-grinch-stole-christmas-2000/`,
            `https://letterboxd.com/film/murder-on-the-orient-express-2017/`,
            `https://letterboxd.com/film/the-lost-city-of-z/`,
            `https://letterboxd.com/film/baby-driver/`,
            `https://letterboxd.com/film/clue/`,
            `https://letterboxd.com/film/game-night/`,
            `https://letterboxd.com/film/national-treasure/`,
            `https://letterboxd.com/film/the-man-from-earth/`,
            `https://letterboxd.com/film/pirates-of-the-caribbean-the-curse-of-the-black-pearl/`];

        var recs = [`Silver recommends: `,
            `This gets the Silver Seal of Approval`,
            `Now playing on The Silverscreen`]

        var r = Math.floor((Math.random() * movies.length));
        var r2 = Math.floor((Math.random() * recs.length));

        message.channel.send(recs[r2]+`\n`+movies[r]);
    }

    if (command === `ULTRAFIGHTDAKYANTA2LEAGUE`) {
        message.channel.send("if ur reading this ur gay lol");
    }

    //Skrt
    if (command === `SKRT`) {
        message.channel.send(`No Johns.`);
    }

    //Soap
    if (command === `SOAP`) {
        var sponsors = [`BOFA`,
            `BOFA`,
            `BOFA`,
            `Swimmypants`,
            `AFOB`,
            `TSM`,
            `Cloud 9`,
            `Liquid`,
            `EG`,
            `Fnatic`,
            `OpTic`,
            `nV`,
            `Dig`,
            `FOX`,
            `MVG`,
            `Big Time Rush`,
            `BTR`,
            `dummy high apm`,
            `APM`,
            `Big Lunch`,
            `Nice list :)`,
            `Slight Smile`,
            `:slight_smile:`,
            `this`,
            `all of my this`,
            `Big Time Lunch`,
            `chick-fil-a`,
            `choccy milk`,
            `CFA`,
            `not a dnd nerd`,
            `gryffindor`,
            `in a hot tub`,
            `cancer`,
            `cum`,
            `wheel of fortune`,
            `first name`,
            `bondage`,
            `GANONLOVER700`];

        var name = [`Soap`,
            `Soap`,
            `soap`,
            `soap`,
            `soap`,
            `soap`,
            `soap`,
            `sans`,
            `Sans Undertale`,
            `mike`];

        var min = Math.ceil(1);
        var max = Math.floor(4);
        var numSponsors = Math.floor(Math.random() * (max - min + 1)) + min;

        var fullName = '';

        for (var i = 0; i < numSponsors; i++) {

            var r = Math.floor((Math.random() * sponsors.length));

            fullName += sponsors[r];
            fullName += ' | ';
        }

        var r2 = Math.floor((Math.random() * name.length));

        fullName += name[r2];

        message.channel.send(fullName);
    }

    //SPOTW
    if (command === `SPOTW`) {
        message.channel.send(`haha yo check out this post bro it's really funny haha its a good post bro pls look at it haha\n<@!337284886039625728>`);
    }

    //Stream mommy
    if (command === `STREAM` || command === `STREAMMO` || command === `STREAMO` || command === `STREAMMOMENTUM` || command === `STREAMOMENTUM` || command === `MOMMY` || command === `STREAMMOMMY` || command === `GAYIDIOT`) {
        var r = Math.random() * 11;

        if (r <= 2) {
            var m = [`https://media.discordapp.net/attachments/612061640694824960/681218129396891700/unknown.png`,
                `https://media.discordapp.net/attachments/612063670297427978/746013573121310750/Screenshot_20200820-103129_Discord.jpg`];

            var r = Math.floor((Math.random() * m.length));

            message.channel.send({file: m[r]});

        } else {
            var s = [`I don't know why everyone is so mad\nI'm just speaking factually`,
                    `that's a meme`,
                    `I might be uh, mentally challenged`,
                    `i try not to get my political life (i.e. my support for bernie sanders) to interfere with my posts here`,
                    `Okay I said some dumb shit`,
                    `Sometimes I post sincerely`,
                    `Do you think the bot is overloaded?`,
                    `No NVM I'm just being racist lmao`,
                    `there's no argument, only streamomentum`,
                    `stream mother is a man of honesty and integrity but only when he says stuff i agree with`,
                    `Streamo would be hilarious if he was a bot command`,
                    `the societal pressure that white people feel not to say the n word is of course also felt by black people`,
                    `I would never murder someone again`];

            var r = Math.floor((Math.random() * s.length));

            message.channel.send(s[r]);
        }
    }

    //structuremole
    if (command === `STRUC` || command === `STRUCTURE` || command === `STRUCTUREMOLE` || command === `MOLE` || command === `PEEPEE` || command === `POOPOO` || command === `PEEPEEPOOPOO` || command === `PIPI` || command === `PUPU` || command === `PIPIPUPU`) {
        var s = [`J.D. from scrubs`,
                `Dr. House from House`,
                `Bones from StarTrek`,
                `Doc from Back to the Future`,
                `Dr. Frankenstein from Frankenstein`,
                `Dr. Wu from Jurassic Park`,
                `Dr. Jekyll from The Strange Case of Dr. Jekyll and Mr. Hyde`,
                `Dr. Rumack from Airplane!`,
                `Doc Ock from Spider-Man`,
                `Dr. Evil from Austin Powers`,
                `Dr. Strangelove from Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb`,
                `The Doctor from Doctor Who`,
                `Dr. Griffin from The Invisible Man`,
                `Dr. Lecter from Silence of the Lambs`,
                `Dr. Huxtable from The Cosby Show`,
                `Dr. Zoidberg from Futurama`,
                `Dr. Spaceman from 30 Rock`,
                `Dr. Mario from Melee`,
                `Dr. Freeman from Half-Life`,
                `Dr. Zhivago from Doctor Zhivago`,
                `Dr. Acula from Dr. Acula`,
                `Dr. Oz from The Dr. Oz Show`,
                `Dr. Eggman from Sonic the Hedgehog`,
                `The Medic from Mafia.gg`,
                `The Doctor from Mafia.gg`];

        var r = Math.floor((Math.random() * s.length))

        message.channel.send(`Became a doctor to be like `+s[r]);
    }

    //SubF
    if (command === `SUBF` || command === `SUBJECTIVE` || command === `SUBJECTIVEF` || command === `SUB` || command === `RESTINPEACE` || command === `RIP`) {
        var f = [`Fox`,
            `Fun`,
            `Fucking stop tagging me on reddit dot com`,
            `counts Friendlies`,
            `FUCKING FUCK`,
            `https://cdn.discordapp.com/attachments/611202965558132747/620398820844503052/Fuck_you.gif`,
            `Fuck`,
            `Fucker`,
            `Forgetful`,
            `Faggetful`,
            `Fascist`,
            `Fag`,
            `FungaBunga`,
            `Fiction`,
            `Fountain of Dreams`,
            `Faggot`,
            `Funeral`,
            `Falco`,
            `Fungus`,
            `Fashion`,
            `Finance`,
            `Feisty`,
            `Flower`,
            `Fraud`,
            `Frick`,
            `Frigg`,
            `Freak`,
            `Fisches for grabs`,
            `puFf`,
            `Falcon`,
            `Free`,
            `Floaty`,
            `Fastfaller`,
            `Fast fall`,
            `Fish`,
            `Floaty mid tier`,
            `Forward over-B`,
            `F-air`,
            `Fighter`,
            `Forward aerial`,
            `Fucking hates balls`,
            `Phenomenal`,
            `pufF`,
            `FOXY`,
            `Franchise`,
            `Frankenstein`,
            `Forensics`,
            `F-smash`,
            `F-tilt`,
            `Foxtrot`,
            `Full hop`,
            `Final Destination`,
            `Frame`,
            `Frame perfect`,
            `Future`,
            `FMT`,
            `Feminine penis`,
            `Fucking love penis`,
            `Fuck engineers`,
            `Fuck floaties`,
            `Fuck mini sentries`,
            `Fuck puff`,
            `Fuck Peach`,
            `Fuck ICs`,
            `Fuck Luigi`,
            `Fuck Mario`,
            `Fuck Doc`,
            `Fuck Samus`,
            `Fuck me 😳`,
            `Fruit`,
            `Full blown retard`,
            `Freedom of speech`,
            `Fuck cael`,
            `Fuck coffee`,
            `Fuck wobbling`,
            `FUCK 12`,
            `Fucking idiot`,
            `Fuck my tiny ass`,
            `Fuck hbox`,
            `Feel`,
            `Felt`,
            `Feelings`,
            `Feet`,
            `Fête`,
            `Fate`,
            `Fat`,
            `Faring`,
            `Farting`,
            `Fart`,
            `Fill in the blank`,
            `you to Find out`,
            `Footsies`,
            `Feetsies`,
            `Friend`,
            `Friend :)`,
            `Fiend`,
            `Fiction`,
            `Faker`,
            `Faker? I think you're the fake hedgehog around here. You're comparing yourself to me? Ha! You're not even good enough to be my fake.`,
            `Friend`,
            `Fool`,
            `Flame`,
            `Flaming homosexual`,
            `Firefox`,
            `Facts don't care about your feelings`,
            `can'tgobackwardsinstarFox64`,
            `Fuuuuuck please come back pleasepleasepleaseplease`,
            `you stupid bitch, you stupid fucking bitch, you stupid Fucking bitch`];

        var r = Math.floor((Math.random() * f.length));

        message.channel.send(`The F stands for `+f[r]);
    }

    //Suggestion Box
    if (command === `SUGGESTION` || command === `SUGGESTIONBOX` || command === `FEEDBACK`) {
        message.channel.send(`Please fill out this form with any comments or suggestions about me :)\nhttps://forms.gle/6sesdfNuioYNT5hB7`);
    }

    //Ted
    if (command === `TED` || command === `EMPTY` || command === `TEDEMPTY` || command === `TEDWARD`) {
        /*var t = [`Traitor.`,
                  `Fuckboi.`,
                  `Bitch.`,
                  `Shitlord.`,
                  `Incel.`,
                  `Loser.`,
                  `Virgin.`,
                  `Coward.`,
                  `Scumbag.`,
                  `Troll.`];*/

        var names = [`SubjectiveF`,
                `Sub`,
                `ADLP`,
                `Airplane`,
                `anime lover`,
                `Antiprompt`,
                `Brio`,
                `Bubbles`,
                `Cael`,
                `Cag`,
                `Chandy`,
                `Coffee`,
                `Coriamon`,
                `Cuck Daddy`,
                `Darsh`,
                `dimi`,
                `Drew`,
                `Zmwivd`,
                `Zimwit`,
                `Draco`,
                `Drax`,
                `DuckNumbers`,
                `Faceroll`,
                `Farmstink`,
                `FloatyApologist`,
                `Goiter`,
                `Goloche`,
                `IceMaster`,
                `Loscar`,
                `Midnight`,
                `Restingcarcass`,
                `Risc`,
                `Rognut`,
                `Rootnut`,
                `Silver`,
                `Illusion`,
                `Skrt`,
                `Soap`,
                `Stream Mommy`,
                `Struc`,
                `Sugden`,
                `Sugden_`,
                `Ted`,
                `Winnarly`,
                `Wub`];

        var r = Math.floor((Math.random() * names.length));
        var r2 = Math.floor((Math.random() * names.length));
        var r3 = Math.floor((Math.random() * names.length));

        //message.channel.send(t[r]);
        message.channel.send(`“I once wedged a man inside a beached whale’s vagina, so I could fuck him and fuck the dead whale at the same time,” `+names[r]+` said, his voice a guttural burr, a voice like tarred gravel.  “Dead whales can explode if they’re on land, gases inside ‘em, so it was a motherfuckin’ Russian Roulette necrophiliac bestiality double-fuck.  Now ask me why.”\n\n“Do I have to?”  `+names[r2]+` asked. `+names[r3]+` jabbed him.  “Why?”\n\n“So I could say I did it."`);
    }

    //Vro
    if (command === `VRO` || command === `RATTAIL` || command === `SHITCOMMENTARY`) {
        var r = Math.random() * 14;

        if (r <= 2) {
            var m = [`https://cdn.discordapp.com/attachments/611202965558132747/625272358583926784/unknown.png`,
                    `https://cdn.discordapp.com/attachments/611202965558132747/625328138414718978/EBo4sqp.png`];

            var r = Math.floor((Math.random() * m.length));

            message.channel.send({file: m[r]});

        } else {
            var h = [`I like seeing vro commentate because it reminds me that even if you look like a scumbag and are innately annoying you can still be successful`,
                    `Imagine being someone who's played melee for 3 or 4 years. You're not the greatest player ever, but you can do some things and all your homies think you're sick. \n \nYou head on out to beautiful Worcester MA for Shine. For some reason, your round 1 pool match gets called to be on stream. You think to yourself how cool it'll be to have a real commentator talk about your melee play. "Maybe Armada will commentate my pool and I'll learn something," you think. "Or maybe it'll be The Cheat, he's pretty funny and that'll be something I can go back to for a laugh." \n \nYou make your way on stage, passing by the commentators. You didn't even realize it, but you've been smiling this whole time. You turn your head to check out the commentators. There's one guy you don't really recognize - "that's alright," you think - then you look to his right. It's Vro. \n \nYour smile fades. A new pain appears in your left wrist. You lose 4 GALINT off your ledgedashes. \n \nMaybe it's time for you to take a break from melee.`,
                    `*picking hairs off my rattail* He vros me, he vros me not....`,
                    `Vro, Vro, Vro your boat \nGently close the stream`,
                    `WHATS up Vrochachos iiiiits ya boiii Cary here coming atcha with another hot steamy Melee Blast straight outta my vroZONE. You know we like to keep it crankin out sweetness with 100% natural Stevia over at Melee Everyday, but now that we're DOUBLE HQd from the L.A reeg we can hit you twice as many Care-y packages. Like your Mommy sending you pop-tarts and optimistic condoms to the dorms, we've got TWICE the commie blocks, TWICE the content and HALF the clout of Gimr. Rest up and Bless ⬆️ on this glorious day, and if you want to reach me you Chan always slide into my DMs for business inquiries.`,
                    `Vruh`,
                    `hes actually controlled by the rat tail \nsort of a voldemort situation`,
                    `Vro \nis \nBAD`,
                    `The 3 W’s of Life: Women, Wisdom, and Whining about how bad Vro is on commentary`,
                    `https://www.youtube.com/watch?v=4HkaW0zVH7E`,
                    `https://www.youtube.com/watch?v=Lx4k-0RFaaQ`,
                    `Two Vros diverged in a yellow wood \nAnd I'm sorry I could not mute them both`];

            var r = Math.floor((Math.random() * h.length));

            message.channel.send(h[r]);
        }
    }

    //Winnarly
    if (command === `WINNARLY` || command === `WINNAR`) {
        var w = [`Final Destination has no platforms?`,
                `cum sounds like come?`,
                `it's meaningless to factor in how long a win streak lasted since it doesn't reveal how many tournaments the player went to in that time period?`,
                `hbox had a 6 month win streak before he lost come to papa 3 to Zain?`,
                `some synagogues sell tickets to their service on high holidays when attendance is expected to be high?`,
                `pichu can now officially dab to escape falco shield pressure?`,
                `having money is unethical?`,
                `you can now pet the dog thanks to the new update?`,
                `brawl's dankest meme was stolen from melee?`,
                `shine's a 1 frame move?`,
                `I'm making a video game?`,
                `before drew became a subreddit roy stan, he was the inspiration for one of the most ambitious cinematic accomplishments in the history of schmelee?`,
                `we all die someday and nobody has time for your chicken shit bull shit?`,
                `doc’s nair gets stronger the longer the hitbox is out?`,
                `humans thousands of years ago literally did not feel stress?`,
                `Helium is an actual atom? It's not just in balloons!`,
                `mango is in grand finals winners side of pound 2019?`,
                `under night is going to be at melee instead of evo?`,
                `giga bowser has a shorter jumpsquat than bowser?`,
                `2 dicks are better than 1?`,
                `the first mbmbam podcast was don on a rockband controller?`,
                `dr pp got rainbow cruise banned?`,
                `ganondorf has a frame 3 down b?`,
                `bowser loses to puff?`,
                `melee was invinted before color?`,
                `worm was originally a fox main?`,
                `marth has a down air that can't be meteor canceled?`,
                `Roy can OHKO Puff with his up b?`,
                `rog is druggedfox?`,
                `you only like this game because it activates pleasure receptors in your brain? Fucking sheep.`,
                `JK Rowling came out and said that the reader was gay?`,
                `literally the only reason people still play melee is because Fox is so fucking sick?`,
                `Buffalo NY actually stole Buffalo Wings from Montpelier, VT?`,
                `you can reach side platforms with Fox usmash on yoshis?`,
                `DuckNumbers has his own subreddit for all his shitposts?`,
                `borp and pannenkoek are brothers?`,
                `puff dies early?`,
                `pannenkoek's brother is rognut?`,
                `Fiction's a little bitch?`,
                `you can't go backwards in the OG Mario, I'm pretty sure?`,
                `Dark Souls 2 is a completely different game in Japan! It was released in the rest of the world as "Dark Souls: The Lost Levels" and the Dark Souls 2 you know and love was originally a game called "Doki Doki Literature Club"`,
                `on no DI, upthrow rest works on fox from anywhere between 0 and 104%?`,
                `gamefreak ripped off sceptile's mega from a fangame?`,
                `Mewtwo can just roll away from Kirby and there's literally nothing Kirby can do to stop it?`,
                `a picture is worth a thousand words?`,
                `Falco's downsmash hits below battlefield?`,
                `ganon is the highest tier zelda character on the css?`,
                `bowser's NICE top spin serve is only 6 mph faster than baby mario's due to a programming error?`,
                `you can see the decline of civilization is directly correlated to how prominent final fantasy is in popular media`,
                `you could say the n word on discord and delete it before anyone sees\nwatch`,
                `you can delete cortana altogether`,
                `lgl will actually hurt amsa and ultimate2king too? we should only be trying to target hbox here, ok?`,
                `sub is african american?`,
                `in addition to playing melee over the internet, you can also hold a conversation over the internet!`,
                `Osama Bin Laden had emulators, pokemon roms and naruto episodes downloaded onto his laptop?`,
                `I don't eat any vegetables whatsoever?`,
                `shine turnaround firefox to grab ledge is actually shit?`,
                `Philly cheesesteaks were actually invented in New Hampshire?`,
                `Ganon plays much more like Sheik than like Falcon?`,
                `Borp's brother is Aniolas?`,
                `you can't go backwards in the OG Mario, I'm pretty sure?`,
                `Marth is actually in the Mario Tennis GBA game?`,
                `The X-Files is like The Office but not funny`,
                `Darsh once held the world record for Luigi Downward Angled Forward Tilt Only Home Run Contest?`,
                `The Falcon Punch, while a very famous and iconic move, sees little use in competitive play, mainly due to its relatively lackluster start-up window.`,
                `armada and mango used to have a rivalry?`,
                `Mario says "yahoo!" when he does a tornado, but Doc remains silent during his?`,
                `Dr. Mario's neutral aerial does more damage and knockback the longer it's out, while it does less damage and knockback when it first comes out. Overall, Mario's sweetspotted neutral is in between Dr. Mario's neutral aerial's sweet and sour spots.`,
                `Eddie Vedder was the Goatest Guitarist?`,
                `red moroccan salt can center your chakras?`,
                `there was a set with amsa vs hbox I think where he's doing ECE's and dies for it\nand scar is like HOW DID HE DIE`,
                `bowser's NICE top spin serve is only 6 mph faster than baby mario's due to a programming error?`,
                `you can see the decline of civilization is directly correlated to how prominent final fantasy is in popular media`,
                `lgl will actually hurt amsa and ultimate2king too? we should only be trying to target hbox here, ok?`,
                `78% of black people live underground and only come up after sundown.`,
                `in the PAL version of Super Smash Bros. Melee, Marth, Roy, Link, and Young Link had their swords completely removed from the game?`,
                `the claps in Death Grips 'Spread Eagle Across the Block' are actually skateboard wheels hitting pavement?`,
                `Filipino's are the most powerful race in the world?`,
                `if you laid all of sugden's posts out lengthwise, they'd stretch over 15 miles! That's more than FIVE football fields!`,
                `If you take raw chicken and add heat, it becomes cooked chicken. Just like in minecraft!`];

        var t = [`Wow!`,
                `It's true!`,
                `Wow!`,
                `It's true!`,
                `The more you know!`,
                `I wouldn't lie to you!`,
                `Simply... wow.`,
                `Isn't the world amazing?`,
                `How interesting!`,
                `Yeah, that's right!`,
                `I said it.`,
                `Facts don't care about your feelings.`,
                `Where's the lie?`,
                `It explains everything!`];

        var r = Math.floor((Math.random() * w.length));
        var r2 = Math.floor((Math.random() * t.length));

        message.channel.send(`Did you know... that `+w[r]+`\n`+t[r2]);
    }

    //Xavier
    if (command === `XAVIER` || command === `XAV` || command === `XAVIERRENEGEADEANGEL`) {
        var x = [`I'm a survivor. We're a dying breed.`,
                `[scoffs] Powers are for the weak. I have no powers. I mean, unless you count the power to blow minds with my weapons-grade philosophical insights.`,
                `If the computer virus is infecting people, then I need a human virus to infecticide the computer`,
                `Welcome to the US Army, how can I help you? \nI need some of that disease you guys invented \nCrack? \nThe other one \nAIDS? \nThat's the spice`,
                `Just got to dump this load in that dirty 'puter's floppy slot and collect my kudos.`,
                `I believe that we are all one. By helping this tiny mosquito, in a way, I'm helping your mother. \nHe's comparing the universal oneness of all life to your mama!`,
                `You were a hit! Everyone loves you, now. You even, have a girlfriend. \nReally? Is he disabled?`,
                `Nobody has ever survived our initiation, come give it a try. Here's my card. It's got embossed gold 12-point Courier font on bone white semigloss stock \nBone white? I thought we all agreed to get eggshell white! Absurdity! \nI'm the leader! I say bone white! [thinking] Its haunting elegance is so restrained.`,
                `Now boil his blood and get our drugs back. Charge him a recycling fee!`,
                `We all have our own way of killing. Me, I like to kill on the beach. \nI like to kill to music.\nThis is kind of embarrassing, but I like to kill on the toilet.`,
                `IacceptJesusChristintomyheartasmypersonalsavior YES! Made it!`,
                `Ready? Inhale. Hold. Hold. HALE.`,
                `MY EYE! My visual connection to this beautiful world has been severed!`,
                `You need to slow it down, relax. Inhale. Hold. Hold.\n*takes out water skin and takes a swig*\nHold. Hold. Little longer. Hold. Hale.`,
                `I want to infiltrate the gang. I may just have some avenging chief beef to queef.`,
                `I killed him hard. Pulled out his heart and showed it to him, and he was like, "Nice!"`,
                `Once a year we let one novice member sit in as gang member for a week. My benefit is that I get to see the gang from a novice perspective, and then you benefit by experiencing the hardships that come with the administrative role that I play.`,
                `I can think so clearly, without all the visual clutter.\nNow everyone will know The Loco's are crazy about postmodernist aesthetic contextual reframing!`,
                `Friday night is Taco Tuesday!\nInstead of eating taco's, let's just talk. Ohhhhh.`,
                `You're right, rape is not an excuse, it's a reason. And tonight, everything seems so reasonable.`,
                `So she says "Oh, that puppy is the cutest thing in the world!" and it's like, I'm standing right here mom! I'm standing right here...`,
                `You're not better than me, okay? Just because you created life, doesn't make you some kind of god. There's more to life, than life.`,
                `Condescension! The last refuge of the differently-abled. Crippical. Don't talk down to me from down there on your sparkling high horse.`,
                `Oh yeah? Stand up and say that to my face. Oh yeah, I forgot. You can't stand. So maybe I have a memory problem, but at least I can- uhhhh, I can do theeeee...\nStand?\nNo thanks guy, I'm beat. *sits down* Now where was I? OH YEAH! *stands up* I was walking outta here!`,
                `Can you tell me how to get to the lake?\nHow are you going to get there, by car?\nI'm driving right now!\nOkay, first, you wanna get in your car. Then, you wanna start your car! A lot of people make it halfway to the lake, then they realise they forgot to start their car.`,
                `At least he died with God in his herat, you can taste it. Mm, could use a little coconut.`,
                `They say when you die, you shit your pants. But not me, I'm gonna shit my heart.`,
                `Fate. Destiny. Fatestiny. People throw around those words like tennis balls. Well I eat balls for breakfast.`,
                `Welcome home kids. It doesn't look like much, but these sewer walls were built with love. you can taste it [licks wall]`,
                `[Talking to infants] Kids, I swear, I'm gonna love all of you, and equally. I will be dividing my love into 7 equal sections, or "love quadrants". Each quadrant will be worth 15 love units, represented by these small brass marbles. You may use these marbles as currency amongst yourselves. Collect 35 love units and you can trade those in for a beach towel with my face on it. Collect more than 3 towe- what is that racket?`,
                `Aw, the wails of a victim. Almost as heartbreaking as the victim of a whale.`,
                `I'll get you to puke. Okay, okay, one time there was this reaaaally wrinkly old lady, and- and she was reaaaally weeeeeiiiiird \nSnake hand says "You're just making me horny" \nAnd and she pulled this huge scab away from her face, and ate it. Oooh, sick... *(vomits)*`,
                `This is no longer a clue, it's a game. You may have just gotten checkmate, but we're playing Chinese Checkers, and as my good friend Confucius say, "The hunter has become the hunter-ed. The chaser has become the chose'd." Dame Fortuna has had her franking priveleges revoked. It seems the portrait has painted the artist, sketching the reverser, who has become the reverset. But this time, the suffix'd will become the sufferer. And it appears the baby killer, is about to kill a baby. [vomits]`,
                `Rain... It's just God's tears. I know a shamanic Navaho rain dance, that hasn't just blown MINDS. Its's blown ducks. 'Tear ducks'.`,
                `Well, I'm a good farmhand, and I don't need much. Just five hots. And a cot. And a queen-size lazy bread bed. And a flatscreen iTV. And a WiFi hotspot. And a breakfast nook... A sauna. Conversation nook. Some o' them crazy cookies.\nWe're in a drought. I can give you a plate of weevils every day...\nDeal! *(thinking)* Sucker, I would've settled for every OTHER day.`,
                `Society is about to end, girl. And it's up to us to start repopulating the planet.\n I suppose so...\nReally? OH! I just repopulated my pants.`,
                `If these be my last words, then I'd like to leave this world with one final thought: Me no wanna die, mommy! Waaahhh!`,
                `My name is Goldern B. Taintnun, as in "T'ain't none of yer goldern beeswax!"`,
                `You are not on trial for shooting the mayor. You are on trial for being on trial! \nBut I swear, I'm innocent! \nBy proclaiming your innocence, you admit that you are on trial!`,
                `A crying lady! I'll help you. I'm a feminist. I'll make sexism my bitch. Sexism will be all like, "Oh Xavier! You're so strong! Kissy kissy! You can hit me. I like it."`,
                `What *is* this place and who *am* I? I don't remember my name. All I remember is that I don't know my name, and that I can't remember if I do know my, uh, um.`,
                `[points gun at Xavier] Do you believe in God? \nThat's a complicated question. It depends on what you mean by "God". You see, I- \nYes or no?\nIt helps no one to be reductive. I believe that that we are here implies to some degree that there are forces larger than us. Now, we can get into the semanticalities...\n***Yes* or *no***\n[smokes a pipe] The very notion of belief itself can be rhetorically whittled to the bare nub of its meaning. [attempts to hand the man a pamphlet] I'd like to talk to you a lot more about this. Would you be interested in reading some of my literature?\n**NO!** [shoots himself]`,
                `Ma'am! Someone stole our Bloodhounds! But we got the backup Bloodhounds to chase the first tier Bloodhounds! Their scent took us here. \nThey were just here...THEY ATE MY BABY! [sobbing] \nI knew we shouldn't have left you alone! You're twisted! And you have the gall to blame it on police dogs? [tears running down his cheeks] Those dogs were decorated. Look at this place! What have you ever decorated?`,
                `I've got him cornered. And it looks like this time, the Coroner has become, the Cornholer.`,
                `I forgive you. you can put me to death, but you can't put me to life.`,
                `I think we all now realise that our society needs to stop its selfish search for missing children and start searching for the child within, the only child that matters.`,
                `Don't you see? The missing child you each seek to reconnect with is still inside you all. But you buried it. You, Paul, when you were six and you killed that spider monkey with that claw hammer, you really just squashed your heart with that hammer, and that's why you became a dirty pig cop.`,
                `Unload your troubles unto me, even if it's tough to swallow. I'm used to swallowing huge loads.`,
                `But, Master, you can't punch someone with your mind.\nHold this board.\n*(a phantom fist emerges from the guru's head and punches young Xavier in the face)*\nIdiot. He totally missed the board.`,
                `I was trained for 22 years to fight with my feet, but it takes a real man to console with his feet.`,
                `This insolent micro-billionaire is cruisin' for a bruisin'. Crawlin', for a brawlin'. Achin', for a spiritual awakenin'!`,
                `I'm gonna break you down, using Navajo Mysticism. Or Cherokee Fisticism.`,
                `The wise elders taught that resorting to violence will never change a person on the inside. In conflict, you must rip your opponent a new asshole in his conciousness. Soon, his mind will be open to all truth, all hole, no ass.`,
                `By smashing myself in the raisins, I'm smashing your mind, in the balls. \n*(Xavier smashes himself in the balls)* \n[coughing in pain] AUUUUGH! ughhh... It...didn't work...`,
                `Why are you making those horrid groaning sounds? \nI'm in pain, you little turdlet. \nSilly! Pain is a myth made up by poor people who don't want to work. Tears are as real as a unicorn's horn. I've got a unicorn's horn belt!`,
                `Let's play a board game. I'm bored. I win! What's my prize? Where are you hiding my prize? \nYour prize is up here [points to own temple] \nIs it a puppy? We better *hwip* open the crate before he suffocates, like all the rest.`,
                `So pain is real...I hate it! I intend to buy up all the suffering in the world and drown it in the ocean like a kitten.`,
                `The balance of happiness is constant. \nFACT: Every time you eat a bite of cake, someone gets horsewhipped. \nFACTOR: Every time two people kiss, an orphanage collapses. \nFACTEST: Every time a baby is born, an animal is severely mocked for it's physical appearance.`,
                `My frolicking life of laughter has blood on its hands. Cake tastes like a whiplash on my tongue. I've farted on the doorknob of justice.`,
                `I gotta warn ya. They say every cigarette takes 17 minutes off your life. \nWell hey, if I keep smokin' fast enough, I'll get younger. \nShoot, you're a baaaad little boy. \nBesides, they say every slice of bacon takes 9 minutes off your life. I just chowed me down a years worth. \nHmph. Shoot, you're a naughty boy. I'd like to put you over my knee, and spank you some.`,
                `How long you been standing there ya freak? \nWhat are you, a chinamen? \nI wish I knew myself. \nWe don't cotton to strange chinamen, with no sense of self, who stand secretly by for indeterminate amounts of time! Gonna put you in a worl of hurt! \nTake THAT! Taste the pain!`,
                `[Covered in bruises] Maybe, it my husband! He only do it becuase he love me! \nNo, that's the stupidest thing I ever heard. Maybe he does it because you're stupid.`,
                `From now on, I'm your guardian. I'll be standing right behind you, and if he wants to get ot me, he's gonna have to punch his way through you first.`,
                `That is the peak of disappointment. [Points to mountain peak with Xavier: Renegade Angel title card on top]`,
                `WUH-OH! Now there was a FACTORY MIXUP! We accidentally mixed up the COOKIE factory, with the TAMPON factory! Now our cookies absord up to TWO PINTS OF FLAVOUR! \nYummy! And the light floral scent keeps me feeling fresh all day! \nThese Blue chocolate chip tampons are gooably, chewably, HUGE! So huge, it hurts! Just slice and insert!`,
                `I'm on a helping roll, and I'd be glad to do a solid all over your family.`,
                `At least this brutal drought hasn't taken your poor grandma. \nThat's my daughter, she's 14. \n*(Thinking)* Ooo, nice and legal.`,
                `No, Burning Man! Actually this year we're not gonna be sexist, we're calling it Burning Person. In this day and age, women can be set on fire too.`,
                `Ma'am, I'd like to make some seed money. Uh, I'd like to peddle my puddle ma'am. Yoohoo! I'd like to hawk my loogie. \n*(Sighs)* We pay by the cup, or the noseful. \nUm, cup please, I'm kind of nervous. I've never plopped my glopper. Been saving myself for marriage, or at least consent.`,
                `[Burning alive] This is Democracy! Personified!`,
                `Before we sing our glorious praise to the lord, it is my sad duty to announce that our sign language translator has donated her hands to the needy groper society. In her place we have PoPo, a very special gorilla from the research society, who has been studying sign language under the tutilage of my wife June for 3 years.`,
                `We're back! WCRST suckatie suckabrrr in the morning, the Christian zoo radio hooty-hoo featuring suckatie shakabrrr in the morning accept the saviour get into the glorious kingdom, of Heaven. Suckatie suckatash dial us up win some cash we've got traffic on the ones, weather on the WHAT we got PoPo the Preaching Gorilla in the studio how ya doing today PoPo kinda making a splash on the preaching scene make a splash make a splash suckatash call us up WIN SOME CASH! Well it's 5:55 let's check in on the 5 W's we got whowhatwhenwherewhyHOW'S the weather this morning \nWwwweather's on the traffic traffic's on the *(sheep noises)* \nNo time for-suckatie suckatash win some CASH accept Christ into your heart look down on us, from the glorious kingdom of Heaven. Now PoPo I understand you're starting your own 700 club 7's a prime number you're in the prime of your life life could change win a CHUNK of change suck a cash suckaTASH dial us up win some cash we got a caller on line 7 are you there \nYeah, did I win some cash? \n OOOoooh, SO CLOSE! Was the phrase that pays and we give praise! Bow your heads well thanks for coming in PoPo! Coming up we got traffic on the ones traffic every ONE SECOND! There's traffic! There's traffic! There's traffic! No traffic! There's traffic! Sing alert REMIIIIIIIIIIIIIX!`,
                `Welcome to the afterlife! You will experience an eternity of infinite joy in this realm! \nBut my *sexy wife* is still down there and those Filipino Gators are about to eat her! \nI'm sorry, you can't go back. \nI'm not taking no for an answer! *(Pulls out assault rifles)* Get me the *hell* out of heaven. \n*(shoots up heaven)* \nIN THE NAME OF THE DATHER, THE SON, AND THE HOOOOOLY SHIIIIIIIIIIIIIIIIIIIIIII-`,
                `And that's when he realised that to stand and consider all possibilities, is to drown in a tunneling sea of infinite potentiality. So he changed his mind, and took the path on the right. His right. If you are facing him it's your left.`,
                `THAT'S IT! Hold my books! I'm gonna rip you a new A-hole. \nAw yeah! Provide him with a fresh rectum. \nHold my wallet and sunglasses, while I whoop him. \nAww you're going down! \nBest hold my contact lenses too and my silk shirt, don't wanna get any blood on it. \nAwhaw yuuummy! There gonna be blood! \nPlease, walk away! I can't be responsible for what I do when you beat me to death. \nTHAT TEARS IT! Hold my prosthesis *(Tears off leg)* \nAww, you are in for a nubbin'! \nI've got no beef with you. I am, woefully beefless. \nWell I'm about to make you teethless! Oh, hold on to my teeth. Hold on to my tattoo, and my roboticle *(Tears off arm)*`,
                `[Calling himself] No, I called you, and you sound like the ugliest son of a bitch I ever heard. \nYou sound like the physical manifestation of some losers inner demons! \nWell, you sound like some total chode's inability to confront the reality of his past actions. \nIf I ever get you stinky mug in my line of sight I swear to Chekov I'll cock your clock off. \nWell I'm going to be the bigger man, and hang up firs- *(Phone hangs up)* DAMNIT!`,
                `[Arguing with himself] So you're the one who stained them! \nWhoever found it, browned it! \nYou'd like me to be you, wouldn't me? But it's too late. You Snoze, you loze. \nYou Sleep't, you weep't. \nYou nappa, you get slappa! \nYou slumber, a cucumber! \nYou catch up on some zed's, you get outta my headz! \nYou slumber, ham...BURGERdon'twannatalk'boutnothin'else!`,
                `[Arguing with himself] Listen, this psyche isn't big enough for two metaphysical seekers. \You couldn't seek your way out of a cardboard bag! \nYeah, I know. Because it would be an EGG! \nOUUGHH! *(Thinking)* This guy might be better than me. \nYou're right, I am better than me!`,
                `Look buddy, admit when you're defeated. Accept your defecation! \nNo thanks, I'm full. Because I eat pussies like you for breakfast.`,
                `Look at you. You look so superficial, you probably judge things by their physical appearance.`,
                `You're about as deep as a bowl of soup. And your tongue is about as sharp as a *SOUP SPOON!* \nHey. Say what you want about me, but lay off the soup.`,
                `If you love soup so much, why don't you marry soup? \nBecause I'm already married, to Justice. \nYeah, only a blind girl would marry you!`,
                `Oh yeah? Well, when God was passing out insight, you thought he said, that, when, God was passing out holy prophets, you thought he said oily faucets. Cause your soul has diarrhea. Of the mouth. Faucet.`,
                `Are you so dumb, you even answer rhetorical questions? \nI don't know, do you?`,
                `We can play this game all night. \nFirst of all, it's daytime! And this is no game. \nCheck mate! \nOh, so you admit that you're checking me out, and you wanna mate. OOO!`,
                `You got a liscence to sell hot dogs, chico man? \nNo. They wouldn't give it to me, because, when I was filling out the application, my penis was sticking out! \nOh yeah, you only got one penii? Let me see it.`,
                `Oh yeah? Your mom's so shallow, she probably thinks this quip is about her!`];

        var r = Math.floor((Math.random() * x.length));

        message.channel.send(x[r]);
    }

    //Sugden / Cum
    if (command === `SUGDEN` || command === `SUG` || command === `CHAZZ` || command === `CHAZ` || command === `CHAZZDEN` || command === `SUGDEEZY` || command === `SUGDEB` || command === `DOG` || command === `CUM`) {
        var r = Math.random() * 197;

        if (r <= 195) {
            var m = [`https://i.imgur.com/YtYweuz.png`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/615577924783046656/unknown.png`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/619592892234858516/1567789137645.png`,
                    `https://cdn.discordapp.com/attachments/612063946643472389/618975820156764173/corn.png`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/679111020366659595/unknown.png`,
                    `https://cdn.discordapp.com/attachments/612061766830260244/680842347894145094/JPEG_20200222_132422.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/618344161225211936/69473515_10219276880943119_7832993335324180480_n.png`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/616846521392168974/received_780188335732851.jpeg`,
                    `https://cdn.discordapp.com/attachments/612063895082762250/686710154057744464/ESsXT28XgAAZuDK.jpeg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/617558724898324657/JPEG_20190831_201749.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/617443605983920215/JPEG_20190831_124022.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/615952645609357332/JPEG_20190827_175534.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/617397856029900800/IMG_20190831_173826.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/617101653388296278/JPEG_20190830_220100.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/616925518025064481/JPEG_20190830_102128.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/619100351013847040/JPEG_20190905_102330.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/619087599876833280/JPEG_20190905_093240.jpg`,
                    `https://cdn.discordapp.com/attachments/612063946643472389/618913601851228171/JPEG_20190904_220124.jpg`,
                    `https://media.discordapp.net/attachments/612061198288027796/614471733197668388/IMG-20190812-WA0005.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/615560160676675595/IMG_20190826_1055292.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/614471173492703242/JPEG_20190823_154853.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/614471100491104286/JPEG_20190823_154829.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/613779410809651213/JPEG_20190821_175958.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/613779172455743525/JPEG_20190821_175842.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/613415798572056597/IMG_20190820_175249.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/613034163418824922/JPEG_20190819_163804.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/612978436817813554/JPEG_20190819_125658.jpg`,
                    `https://cdn.discordapp.com/attachments/612063946643472389/612338727749943297/JPEG_20190817_183511.jpg`,
                    `https://cdn.discordapp.com/attachments/612063946643472389/612338128161734734/JPEG_20190817_183246.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/612253861364629514/JPEG_20190817_125800.jpg`,
                    `https://cdn.discordapp.com/attachments/612063946643472389/615248249481199748/emoji.gif`,
                    `https://cdn.discordapp.com/attachments/612063946643472389/615244724504231988/Z.png`,
                    `https://cdn.discordapp.com/attachments/612063946643472389/615231847688962049/sugden.png`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/611563402283712552/IMG_20190815_151426.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/611506900852277248/JPEG_20190815_112939.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/610835186329845810/IMG_20190813_150028.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/588448339566002195/image0.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/588442510062256139/image2.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/588442509248692259/image0.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/588442508812615680/image1.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/609224595832307722/IMG_20190808_232043359.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/609223357166256147/received_687242161793112.jpeg`,
                    `https://i.imgur.com/Tf9QJaA.png`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/605540736271777831/Screenshot_20190729-172231_Instagram.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/604435328610336778/timmy.png`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/605540868459593748/Screenshot_20190729-172303_Instagram.jpg`,
                    `https://media.discordapp.net/attachments/555176988562948116/600003486087905281/unknown.png`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/603256016632676362/JPEG_20190723_170352.jpg`,
                    `https://i.imgur.com/dqdUUZt.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/603428017863131164/JPEG_20190724_042706.jpg`,
                    `https://i.imgur.com/BvXGg7I.png`,
                    `https://media.discordapp.net/attachments/566411042738143242/600061732135764003/D-RI0IdW4AQg5Oj.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/600003058323423233/unknown.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/600003345767202818/unknown.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/600003486087905281/unknown.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/600067265987346432/unknown.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/600067494463406090/unknown.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/600067651313729546/unknown.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/600067685019156518/IMG_20181001_122428.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/600069530353532948/unknown.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/600069573932351496/20190508_173330.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/600070030293467136/unknown.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602172803609001994/JPEG_20190720_103000.jpg`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602172885888663552/IMG_20190718_193205.jpg`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602172886807085087/IMG_20190718_193115.jpg`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602172966729416735/JPEG_20190720_163446.jpg`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602207672137285633/unknown.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602207713757364233/20180429_191241.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602207743058771975/FullSizeR.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602207763224985600/red_and_blue.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602207790387298311/1449118552328.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602208807552024577/unknown.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602209495325737006/unknown.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602209552989159424/Snapchat-825518123.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602209741372129280/unknown.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/602210191877865502/unknown.png`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/596392410913832970/JPEG_20190704_103028.jpg`,
                    `https://cdn.discordapp.com/attachments/567417652331413544/601222330865156097/IMG_20190622_142738926.jpg`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/605898887491878956/dog.png`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/605898903086170147/dog_2.png`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/605539691571314718/JPEG_20190728_090311.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/605540018982748172/mq8eny9u3da31.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/604802387756056707/image0.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/604682716482633758/JPEG_20190727_153253.jpg`,
                    `https://cdn.discordapp.com/attachments/555176988562948116/606140681353691166/unknown.png`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/606138286091665451/image.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/606113989956730901/JPEG_20190731_142006.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/606095855841443850/JPEG_20190731_130813.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/607189046015426560/JPEG_20190803_133207.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/607188105207873537/JPEG_20190803_132820.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/606559419605581834/IMG-20180831-WA0002.jpg`,
                    `https://cdn.discordapp.com/attachments/598336899010003015/606270930641223693/IMG_20190731_194403770.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/606138286091665451/image.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/607210695876149248/image0.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/607210812594978826/image0.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/607211749984174110/image0.jpg`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/607222944317571073/Screenshot_20190803-164652.png`,
                    `https://cdn.discordapp.com/attachments/542142763693768731/605540431043756033/20190729_172103.jpg`,
                    `https://cdn.discordapp.com/attachments/542494706932645918/598248990638735370/image0.jpg`,
                    `https://i.imgur.com/vnY6qBY.jpg`,
                    `https://cdn.discordapp.com/attachments/542494706932645918/598248832144375959/image0.jpg`,
                    `https://cdn.discordapp.com/attachments/608818247877525526/615578318540111922/unknown.png`,
                    `https://media.discordapp.net/attachments/612065359285059615/675209168629661696/received_157547255694133.jpeg`,
                    `https://media.discordapp.net/attachments/612058753293877274/675825038800322580/JPEG_20200208_170421.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/675825935966273567/20200131_130407.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/675826544194617344/q8lv9f01n1y01.jpg`,
                    `https://media.discordapp.net/attachments/612065359285059615/675896385375174676/Screenshot_20200208-215044_Gallery.jpg`,
                    `https://media.discordapp.net/attachments/612065359285059615/675901657938132992/image0.jpg`,
                    `https://media.discordapp.net/attachments/612061766830260244/677657301108260874/unknown.png`,
                    `https://media.discordapp.net/attachments/612061766830260244/677657839271018525/unknown.png`,
                    `https://media.discordapp.net/attachments/612058753293877274/679474761100820513/JPEG_20200218_174948.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/680629871709650985/20200221_112042.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/680866189949534421/IMG_20200222_1458562.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/680870595205791789/Screenshot_20191213-205235_Instagram.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/680897236124696677/20200222_160139.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/681219818787045391/IMG_20200223_112341.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/681929959450869782/20200225_011051.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/682632504074698824/JPEG_20200227_115748.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/682634150695403545/20200227_120158.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/682677791204049033/JPEG_20200227_195702.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/682798624954253313/JPEG_20200227_225726.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/682799419216756794/JPEG_20200227_230101.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/682802580920860694/JPEG_20200227_231249.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/682938641882021908/IMG_20200228_131351681.jpg`,
                    `https://images-ext-1.discordapp.net/external/i6G1iw92zY1779QtrDpXICc_lxXyLtN9BOxflCGJqao/https/media.discordapp.net/attachments/612058753293877274/683178811709194311/123_17.jpeg`,
                    `https://media.discordapp.net/attachments/612065359285059615/683340157868441600/123_18.jpeg`,
                    `https://media.discordapp.net/attachments/675486122759028786/687014954158653485/20200307_212115.jpg`,
                    `https://media.discordapp.net/attachments/612061198288027796/685789276340093079/received_137483207604281.jpeg`,
                    `https://media.discordapp.net/attachments/612061198288027796/685673955733930037/JPEG_20200306_212315.jpg`,
                    `https://media.discordapp.net/attachments/612061198288027796/685674574385643531/JPEG_20200306_212533.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/685617852757049344/JPEG_20200306_164020.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/685616851505381383/JPEG_20200306_233632.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/685612753997791312/Snapchat-976137575.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/685592797017145490/image0.jpg`,
                    `https://media.discordapp.net/attachments/612325624203182085/685544663536500913/20200306_124928.jpg`,
                    `https://media.discordapp.net/attachments/612325624203182085/685543553824325650/image0.jpg`,
                    `https://media.discordapp.net/attachments/612061766830260244/685234889817325604/JPEG_20200305_161819.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/688207724881772601/JPEG_20200313_221142.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/688371494136447006/JPEG_20200314_130219.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/688371863914676313/JPEG_20200314_130341.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/690268703488606208/JPEG_20200319_144120.jpg`,
                    `https://media.discordapp.net/attachments/612061766830260244/694268903878033519/JPEG_20200330_153643.jpg`,
                    `https://media.discordapp.net/attachments/612061766830260244/694268924929376256/JPEG_20200330_153633.jpg`,
                    `https://media.discordapp.net/attachments/612061766830260244/694270002219450398/IMG_20200330_124024.jpg`,
                    `https://media.discordapp.net/attachments/612061766830260244/694270255853207572/JPEG_20200330_154203.jpg`,
                    `https://media.discordapp.net/attachments/612061766830260244/694270806984884284/IMG_0858.JPG`,
                    `https://media.discordapp.net/attachments/612061766830260244/694271389783425044/JPEG_20200330_154606.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/684097223155253278/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/695719507452362883/JPEG_20200403_204012.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/695719614755373186/IMG-20200402-WA0001.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/695964594681806968/JPEG_20200404_125430.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/695967858597036032/JPEG_20200404_130648.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/695967978482565120/JPEG_20200404_130803.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/696054580496171028/20200404_135158.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/696188483198255155/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/696438340592992306/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/696702341818089542/IMG-20200402-WA0000.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/696702358956015626/IMG-20200402-WA0001.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/696702379906826240/IMG-20200402-WA0002.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/696702400995655750/IMG-20200403-WA0000.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/696702415860400228/IMG-20200406-WA0000.jpg`,
                    `https://cdn.discordapp.com/attachments/612061367972790281/701989998051852338/JPEG_20200420_225728.jpg`,
                    `https://media.discordapp.net/attachments/612061367972790281/702948561129701566/20200423_142611.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/702968055373889546/output.png`,
                    `https://media.discordapp.net/attachments/612058753293877274/702968585986768966/bc37522fd426b6e95038.jpeg`,
                    `https://media.discordapp.net/attachments/612058753293877274/703733451911594064/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/706156507301150730/123_18.jpeg`,
                    `https://media.discordapp.net/attachments/612058753293877274/707603354083131392/JPEG_20200506_154134.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/705176657186521238/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/706143320728010844/Snapchat-9323679052.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/706156308591673405/20190802_174207.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/706156507301150730/123_18.jpeg`,
                    `https://media.discordapp.net/attachments/612063895082762250/708122011263828069/20200506_201858.jpg`,
                    `https://media.discordapp.net/attachments/612061198288027796/708281634704850944/JPEG_20200508_123659.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/709015395201449984/JPEG_20200510_131330.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/709015547299364874/JPEG_20200510_131406.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/709016527172796466/JPEG_20200510_131823.jpg`,
                    `https://media.discordapp.net/attachments/612061198288027796/709050140295430164/JPEG_20200510_093158.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/710460545706360873/JPEG_20200514_125616.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/710456819394412564/JPEG_20200514_124125.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/710457639917584524/JPEG_20200514_124437.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/710458413519339560/JPEG_20200514_124715.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/710465718076047360/happy-dog-pet-running-on-600w-339532601.png`,
                    `https://media.discordapp.net/attachments/612058753293877274/710483733370765402/95355746_2981154115328343_4251231626844962816_n.png`,
                    `https://media.discordapp.net/attachments/612058753293877274/711232235315003462/JPEG_20200516_110235.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/711559407686910112/JPEG_20200517_134245.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/716814990966784070/JPEG_20200601_014633.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/723289436720332810/image0.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/723299135179980941/20200618_181044.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/722781545114501160/JPEG_20200617_125321.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/721366109365862410/JPEG_20200613_151106.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/719562540337856542/JPEG_20200608_154427.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/718070700124012664/JPEG_20200604_125624.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/716617419149279382/JPEG_20200531_124113.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/716253669837897738/JPEG_20200530_123602.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/733465448925888522/IMG_20200716_182142.jpg`,
                    `https://cdn.discordapp.com/attachments/612061766830260244/732242811121958962/JPEG_20200713_141407.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/731354314492215406/JPEG_20200710_233945.jpg`,
                    `https://cdn.discordapp.com/attachments/612061652874952721/728690326121873438/106540509_10222263770173483_6016073368391652003_o.png`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/727522927586574417/JPEG_20200630_095546.jpg`,
                    `https://cdn.discordapp.com/attachments/632626870487220257/726114666455236608/20200626_123756.jpg`,
                    `https://cdn.discordapp.com/attachments/632626870487220257/726113965784039554/20200626_123654.jpg`,
                    `https://cdn.discordapp.com/attachments/632626870487220257/726113495455760514/20200626_123520.jpg`,
                    `https://cdn.discordapp.com/attachments/612061367972790281/725870524265398302/image0.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/723970222670741686/20200620_143747.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/723965479693189201/20200620_141759.jpg`,
                    `https://cdn.discordapp.com/attachments/612058753293877274/723592740033789982/Resized_20200619_105059.jpeg`,
                    `https://media.discordapp.net/attachments/612058753293877274/711954566911885392/JPEG_20200518_155253.jpg`,
                    `https://media.discordapp.net/attachments/632626870487220257/759064558701641728/20200925_105115.jpg`,
                    `https://media.discordapp.net/attachments/612061198288027796/759045036167659540/20200924_124033.jpg`,
                    `https://media.discordapp.net/attachments/612061367972790281/758838379189370932/20200924_195236.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/752993978080559114/20200908_164903.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/752958610450939976/received_2793557544211487.jpeg`,
                    `https://media.discordapp.net/attachments/612061198288027796/752225080917884928/20200830_034717.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/752186780962390056/20200906_112122.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/751412232247836752/20200904_080308.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/751411904785678396/20200904_080221.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/750869114293321748/20200903_010426.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/750825970977603645/20200902_221350.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/750039446446932068/20200831_130833.jpg`,
                    `https://media.discordapp.net/attachments/612061367972790281/750002093443645520/20200829_204609.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/749535739322040440/20200830_034717.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/749450690073460756/IMG_20200830_030832820.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/748914267243282502/20200828_103727.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/748202071521755237/20200826_112747.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/748201621439250463/IMG_20200826_162045144.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/747499227919286302/Screenshot_20200814-110021_Snapchat.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/747499109208031283/20200824_125424.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/745076459617386516/20200817_202737.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/743878295741005924/IMG_20200814_123727_722.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/742431769709641788/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/742417228879757312/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/741093500266741780/20200806_141545.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/740336305270947840/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/739824626590285915/20200803_083851.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/739715735454220328/Screenshot_20200715-113808_Messenger.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/739715204413390899/Screenshot_20200725-210120_Video_Player.jpg`,
                    `https://media.discordapp.net/attachments/612061198288027796/739194072769495050/0801201352.jpg`,
                    `https://media.discordapp.net/attachments/612063670297427978/738928284397731912/IMG_20200726_221748.jpg`,
                    `https://media.discordapp.net/attachments/612061198288027796/737507102834163754/20200726_004611.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/737269955208413184/Screenshot_20200725-210120_Video_Player.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/737149640100806726/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/657560604357165118/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/735951641152585790/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/735537366780870696/JPEG_20200722_124228.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/735537814799909045/JPEG_20200722_124434.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/733856883579944970/94365342_1160807907603813_8122387643318140928_o.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/760240771461939250/20200928_164518.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/760240947341557790/IMG_20200330_124013.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/760241188342726746/legocat3.JPG`,
                    `https://media.discordapp.net/attachments/612058753293877274/760241373571317770/20200924_111819.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/760260315186855966/IMG_20200928_180236.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/760636988541108304/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/760636966021758996/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/760637459271909386/20200921_204713.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/760639126969516052/IMG_20200806_220110460.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/760993521183883306/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/760997426940739614/123_11.jpeg`,
                    `https://media.discordapp.net/attachments/612058753293877274/762264302647771156/IMG_20201004_114557332.jpg`,
                    `https://media.discordapp.net/attachments/612061766830260244/763779049456926750/20201008_110511.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/764570291115524146/20201010_152916.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/764578302773559306/20201010_160012.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/767126044670689330/JPEG_20201017_134447.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/768324151521574942/image0.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/769725579644895263/123_19.jpeg`,
                    `https://media.discordapp.net/attachments/612058753293877274/771761519964192778/20201030_114440.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/773357353269067796/20201103_202549.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/773356556829720626/IMG_8531.JPG`,
                    `https://media.discordapp.net/attachments/612061198288027796/773388295324827650/image0-36.png`,
                    `https://media.discordapp.net/attachments/612058753293877274/777178166733176863/123_114.jpeg`,
                    `https://media.discordapp.net/attachments/612058753293877274/776760255358828545/20201113_104736.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/776641673039708170/20201112_215458.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/776086567773011999/20201111_091042.jpg`,
                    `https://media.discordapp.net/attachments/612061766830260244/779399230485168148/20201119_113930.jpg`,
                    `https://media.discordapp.net/attachments/612061766830260244/779399245253836800/20201119_113927.jpg`,
                    `https://media.discordapp.net/attachments/612058753293877274/779763449529499698/123_116.jpeg`,
                    `https://media.discordapp.net/attachments/612058753293877274/779788843821695006/IMG_8937.jpg`];

            var r = Math.floor((Math.random() * m.length));

            message.channel.send({file: m[r]});

        } else {
            var h = [`Never cum`,
                    `PSA: Don't do drugs`];

            var r = Math.floor((Math.random() * h.length));

            message.channel.send(h[r]);
        }
    }

    //Turgle
    if (command === `TURGLE`) {
        message.channel.send({file: 'https://cdn.discordapp.com/attachments/612065359285059615/774630944748339210/unknown.png'});
    }

    //Wub Wub Wowzy
    if (command === `WUB` || command === `WUBWUB` || command === `WUBWUBWOWZY` || command === `SMAK` || command === `SMAK9000`) {
        var r = Math.random() * 100;

        if (r <= 5) {
            var b = [`purchased Borderlands 3 for the PS4, Google Stadia, Xbox One and PC (Pedophile Courtcase)`,
                    `purchased a USB drive containing suspicious files`,
                    `gave Randy Pitchford $60`,
                    `purchased a lifesize body pillow of Randy Pitchford`,
                    `purchased a photo album of Randy Pitchford selfies`,
                    `sculpted a statue depicting his idol and role model, Randy Pitchford`,
                    `purchased Borderlands 3 for the PS4, Google Stadia, Xbox One and PC`,
                    `purchased Borderlands 3 for the PS4, Google Stadia, Xbox One and PC`,
                    `purchased Borderlands 3 for the PS4, Google Stadia, Xbox One and PC`,
                    `made a cum tribute of Randy Pitchford's Twitter profile pic`,
                    `purchased Borderlands 3 on the Epic Games Store, selling out all of his information to the Chinese`,
                    `cried himself to sleep because he realised he will never hold Randy Pitchford in his arms`,
                    `returned a lost USB stick to his good friend Randy Pitchford`,
                    `Snitched on a mall that had a Super Mario Bros. ROM in an attempt to be more like Randy Pitchford`];

            var r = Math.floor((Math.random() * b.length));

            message.channel.send(`Recently `+b[r]+`.`);
        } else {
            var w = [`Indiana Jones and the Fate of Atlantis for the Amiga, FM Towns, PC and Wii`,
                    `Indiana Jones and the Infernal Machine for the PC, N64 and GBC`,
                    `Instruments of Chaos starring Young Indiana Jones for the Genesis`,
                    `Indiana Jones in the Lost Kingdom for the Commodore 64`,
                    `the Indiana Jones and the Last Crusade video game for the NES`,
                    `Indiana Jones and the Last Crusade: The Action Game for the Amiga, Amstrad CPC, Atari ST, Commodore 64, Master System, Mega Drive, NES, Game Gear, MSX, PC and ZX Spectrum`,
                    `Indiana Jones and the Last Crusade: The Graphic Adventure for DOS, Amiga, Atari ST and Macintosh`,
                    `the Raiders of the Lost Ark video game for the Atari 2600`,
                    `Indiana Jones in Revenge of the Ancients for the Apple II and MS-DOS`,
                    `Indiana Jones and the Staff of Kings for the Wii, PS2, DS and PSP`,
                    `the Indiana Jones and the Temple of Doom video game for the Arcade, Amiga, Amstrad CPC, Apple II, Atari ST, Commodore 64, MS-DOS, MSX, NES and ZX Spectrum`,
                    `The Young Indiana Jones Chronicles video game for the NES`,
                    `Indiana Jones and His Desktop Adventures for the PC`,
                    `Disney Sing It! – High School Musical 3: Senior Year for the PS2, PS3, Wii and Xbox 360`,
                    `High School Musical: Makin' the Cut! for the DS`,
                    `the High School Musical 3: Senior Year video game for the DS`,
                    `High School Musical 3: Senior Year Dance for the PC, PS2, Wii and Xbox 360`,
                    `Disney Sing It for the PC, Wii, PS2, PS3 and Xbox 360`,
                    `Disney Sing It: Family Hits for the PS3 and Wii`,
                    `Disney Sing It: Pop Hits for the PS2, PS3 and Wii`,
                    `High School Musical: Sing It! for the PS2 and Wii`,
                    `High School Musical 2: Work This Out! for the DS`,
                    `The Haunted Mansion video game for the Xbox, Gamecube and PS2`,
                    `Kinect: Disneyland Adventures for the Xbox Kinect`,
                    `Mickey no Tokyo Disneyland Daibōken for the Super Famicom`,
                    `The Walt Disney World Explorer for the PC`,
                    `Walt Disney World Quest: Magical Racing Tour for the Dreamcast, GBC, PC and PS1`,
                    `Virtual Magic Kingdom for the PC`,
                    `The Cheetah Girls video game for the GBA`,
                    `The Cheetah Girls: Passport to Stardom for the DS`,
                    `The Cheetah Girls: Pop Star Sensations for the DS`,
                    `Adventures in the Magic Kingdom for the NES`,
                    `the Chip 'n Dale Rescue Rangers video game for the NES and PlayChoice-10`,
                    `Chip 'n Dale Rescue Rangers 2 for the NES`,
                    `the Darkwing Duck video game for the NES and GB`,
                    `The Disney Afternoon Collection for the PC, Xbox One and PS4`,
                    `Disney's Aladdin for the SNES and GBA`,
                    `Disney's Hide and Sneak for the Gamecube`,
                    `Disney's Magical Mirror Starring Mickey Mouse for the Gamecube`,
                    `The Magical Quest Starring Mickey Mouse for the SNES and GBA`,
                    `Disney's Magical Quest 2: The Great Circus Mystery Starring Mickey & Minnie for the SNES, Genesis and GBA`,
                    `Disney's Magical Quest 3 Starring Mickey & Donald for the Super Famicom and GBA`,
                    `the DuckTales video game for the NES and GBA`,
                    `Deep Duck Trouble Starring Donald Duck for the Sega Master System and Game Gear`,
                    `Disney Golf for the PS2`,
                    `Disney Magicboard Online for the PC`,
                    `Disney Think Fast for the PS2 and Wii`,
                    `Disney's Party for the GBA and Gamecube`,
                    `Donald Duck: Goin' Quackers for the GBC, GBA, PC, N64, PS1, Dreamcast, PS2 and Gamecube`,
                    `Donald Duck's Playground for the Amiga, Atari ST, Apple II, Commodore 64, IBM PCjr and MS-DOS`,
                    `Donald's Alphabet Chase for the Amiga, Amstrad CPC, Apple II, Commodore 64, ZX Spectrum and DOS`,
                    `Castle of Illusion Starring Mickey Mouse for the MEga Drive, Master System and Game Gear`,
                    `Land of Illusion Starring Mickey Mouse for the Master System and Game Gear`,
                    `World of Illusion Starring Mickey Mouse and Donald Duck for the Mega Drive`,
                    `Legend of Illusion Starring Mickey Mouse for the Game Gear`,
                    `The Disney Collection: Castle of Illusion Starring Mickey Mouse & Quackshot Starring Donald Duck for the Mega Drive`,
                    `Sega Ages: I Love Mickey Mouse for the Sega Saturn`,
                    `Castle of Illusion Starring Mickey Mouse (2013) for the PC, PSN and Xbox Live Arcade`,
                    `The Lucky Dime Caper starring Donald Duck for the Game Gear and Master System`,
                    `Maui Mallard in Cold Shadow for the Genesis, SNES, GB and PC`,
                    `Mickey's Speedway USA for the N64 and GBC`,
                    `PK: Out of the Shadows for the Gamecube and PS2`,
                    `QuackShot Starring Donald Duck for the Genesis and Saturn`,
                    `Disney's Extremely Goofy Skateboarding for the PC`,
                    `the Goof Troop video game for the SNES`,
                    `Goofy's Fun House for the PS1`,
                    `Goofy's Hysterical History Tour for the Genesis`,
                    `Epic Mickey for the Wii`,
                    `Epic Mickey 2: The Power of Two for the PS3, Wii, Wii U, Xbox 360, PC and PS Vita`,
                    `Epic Mickey: Power of Illusion for the 3DS`,
                    `DuckTales: Remastered for the PS3, Xbox 360, Wii U and PC`,
                    `DuckTales 2 for the NES and GB`,
                    `DuckTales: The Quest for Gold for the Amiga, Apple II, Commodore 64, DOS and PC`,
                    `The Nightmare Before Christmas: Oogie's Revenge for the PS2 and Xbox`,
                    `TaleSpin for the NES and GB`,
                    `the Who Framed Roger Rabbit video game for the Game Boy`,
                    `The Little Mermaid video game for the NES and GB`,
                    `Mickey Mousecapade for the NES`,
                    `Mickey's Dangerous Chase for the Game Boy`,
                    `Indiana Jones and the Emperor's Tomb for the Xbox, PS2 and PC`,
                    `Buzz Lightyear of Star Command for the PS1, Dreamcast, GBC and PC`,
                    `Disney's Extreme Skate Adventure for the GBA, Gamecube, PS2 and Xbox`,
                    `the Toy Story video game for the SNES, Genesis, GB and PC`,
                    `Toy Story 2: Buzz Lightyear to the Rescue! for the PS1, N64, GBC, Dreamcast and PC`,
                    `Toy Story 3: The Video Game for the DS, PS2, PS3, PSP, Wii, Xbox 360, PC, Leapster and V.Reader`,
                    `Toy Story Mania! for the Wii, PS3, Xbox 360 and PC`,
                    `Toy Story Racer for the GBC and PS1`,
                    `the Cars video game for the GameCube, PS2, Xbox, PC, GBA, DS, PSP, Xbox 360 and Wii`,
                    `the Cars 2 video game for the Wii, PS3, Xbox 360, PC, DS, 3DS PSP and Arcade`,
                    `Cars 3: Driven to Win for the Switch, PS3, PS4, Wii U, Xbox 360 and Xbox One`,
                    `Cars Mater-National Championship for the Xbox 360, PC, DS, PS2, PS3, GBA and Wii`,
                    `Cars Race-O-Rama for the PS3, PS2, Wii, Xbox 360, PSP and DS`,
                    `Cars: Radiator Springs Adventures for the PC`,
                    `the Brave video game for the PC, DS, PS3, Wii and Xbox 360`,
                    `the Ratatouille video game for Gamecube, GBA, J2ME, PC, Mobile Phone, DS, PS2, PS3, PSP, Wii, Xbox and Xbox 360`,
                    `the Up video game for Xbox 360, Wii, iOS, PS3, PS2, PSP, DS, PC, Mobile Phone, Leapster and V.Smile`,
                    `the A Bug's Life video game for the PS1, PC, GBC, N64, Game.com, Sega Saturn and Dreamcast`,
                    `the Monsters, Inc. video game for the PS2, GBC and GBA`,
                    `Monsters, Inc. Scream Team for the PS1, PS2 and PC`,
                    `Monsters, Inc. Scream Arena for the Gamecube`,
                    `the Finding Nemo video game for GBA, Gamecube, PC, OS X, PS2 and Xbox`,
                    `The Incredibles video game for Gamecube, PS2, Xbox, PC, OS X and GBA`,
                    `The Incredibles: Rise of the Underminer for the PS2, Gamecube, Xbox, GBA, DS and PC`,
                    `The Incredibles: When Danger Calls for the PC`,
                    `the WALL-E video game for PC, DS, PS2, PS3, PSP, Wii, Xbox 360, V.Smile, J2ME and Leapster`,
                    `Kinect Rush: A Disney-Pixar Adventure for the Xbox 360`,
                    `Kamen Rider: Battride War for the PS3`,
                    `Kamen Rider: Battride War II for the PS3 and Wii U`,
                    `Kamen Rider: Battride War Genesis for the PS3, PS4 and PS Vita`,
                    `All Kamen Rider: Rider Generation for the DS`,
                    `All Kamen Rider: Rider Generation 2 for the DS`,
                    `All Kamen Rider: Rider Revolution for the 3DS`,
                    `Kamen Rider: Climax Fighters for the PS4`,
                    `Kamen Rider: Climax Scramble for the Switch`,
                    `Kamen Rider: Super Climax Heroes for the PSP and Wii`,
                    `Kamen Rider: Climax Heroes W for the Wii`,
                    `Kamen Rider: Climax Heroes OOO for the PSP and Wii`,
                    `Kamen Rider: Climax Heroes for the PS2`,
                    `Kamen Rider: Climax Heroes Fourze for the PSP and Wii`,
                    `the Hotel Transylvania video game for the DS and 3DS`,
                    `The Smurfs video game for the DS`,
                    `The Smurfs Dance Party for the Wii`,
                    `The Smurfs 2 video game for the Xbox 360, PS3, Wii, Wii U and DS`,
                    `the Open Season video game for the GBA, Gamecube, PC, DS, PS2, PSP, Wii, Xbox and Xbox 360`,
                    `the Cloudy with a Chance of Meatballs 2 video game for the DS and 3DS`,
                    `the Cloudy with a Chance of Meatballs video game for the PS3, Xbox 360, Wii, DS, PSP and PC`,
                    `the Over the Hedge video game for the Nintendo DS`,
                    `the Over the Hedge video game for the GBA, Gamecube, Xbox, PS2 and PC`,
                    `Over the Hedge: Hammy Goes Nuts! for the GBA, DS and PSP`,
                    `Antz Racing for the GBC`,
                    `the Antz video game for the GBC`,
                    `Antz Extreme Racing for the Xbox, PS2, GBA, PC`,
                    `Antz World Sportz for the GBC`,
                    `Gold and Glory: The Road to El Dorado for the PS1, GBC and PC`,
                    `the Chicken Run video game for the GBC, Dreamcast, PS1 and PC`,
                    `the Shrek video game for the Xbox`,
                    `the Shrek 2 video game for the Gamecube, PS2, Xbox, GBA and PC`,
                    `the Shrek the Third video game for the Xbox 360, PC, Wii, PS2, PSP, DS, GBA and iOS`,
                    `the Shrek forever After video game for the Xbox 360, PC, Wii, PS3, DS and iOS`,
                    `Shrek Swamp Kart Speedway for the GBA`,
                    `Shrek Smash n' Crash Racing for the Gamecube, PS2, PSP, DS and GBA`,
                    `DreamWorks Super Star Kartz for Xbox 360, Wii, PS3 and DS`,
                    `Shrek: Treasure Hunt for the PS1`,
                    `Shrek Super Party for Xbox, PS2 and Gamecube`,
                    `Shrek's Carnival Craze Party Games for PS2, PC, Wii and DS`,
                    `Shrek: Fairy Tale Freakdown for GBC`,
                    `Shrek Game Land Activity Center for PC`,
                    `Shrek: Hassle at the Castle for GBA`,
                    `Shrek Extra Large for the Gamecube`,
                    `Shrek: Reekin' Havoc for the GBA`,
                    `Shrek 2 Activity Center: Twisted Fairy Tale Fun for the PC`,
                    `Shrek 2: Team Action for the PC`,
                    `Shrek 2: Beg for Mercy for GBA`,
                    `Shrek SuperSlam for the PS2, Xbox, Gamecube, DS, PC and GBA`,
                    `Shrek n' Roll for Xbox Live Arcade`,
                    `Shrek: Ogres & Dronkeys for the DS`,
                    `the Puss in Boots video game for the Xbox 360, Wii, PS3 and DS`,
                    `Shrek: Dragon's Tale for the V.Smile`,
                    `Shrek the Third: Arthur's School Day Adventure for the V.Smile`,
                    `Shrek the Third: the Search for Arthur for the V.Smile`,
                    `Spirit: Stallion of the Cimarron — Forever Free for the PC`,
                    `Spirit: Stallion of the Cimarron — Search For Homeland for the GBA`,
                    `the Sinbad: Legend of the Seven Seas video game for the PC`,
                    `the Shark Tale video game for the PS2, PC, Xbox, Gamecube and GBA`,
                    `the Madagascar video game for the PS2, Xbox, PC, DS, GBA and Gamecube`,
                    `Madagascar: Operation Penguin for the GBA`,
                    `the Madagascar: Escape 2 Africa video game for Xbox 360, PS2, PS2, Wii, PC and DS`,
                    `Madagascar Kartz for Wii, PS3, Xbox 360 and DS`,
                    `The Penguins of Madagascar for the DS`,
                    `The Penguins of Madagascar: Dr. Blowhole Returns - Again! for the DS, Wii, Xbox 360 and PS3`,
                    `Madagascar: Join the Circus! for iOS`,
                    `Madagascar 3: The Video Game for the Wii, 3DS, DS, Xbox 360 and PS3`,
                    `Madagascar Preschool Surf n' Slide for iOS`,
                    `the Penguins of Madagascar video game for 3DS, Wii and Wii U`,
                    `Wallace & Gromit Fun Pack for PC`,
                    `Wallace & Gromit in Project Zoo for the PS2, Xbox, Gamecube and PC`,
                    `the Wallace & Gromit: Curse of the Were-Rabbit game for the PS2 and Xbox`,
                    `the Flushed Away video game for the PS2, Gamecube, GBA and DS`,
                    `Bee Movie Game for PC, Xbox 360, Wii, PS2 and DS`,
                    `the Kung Fu Panda video game for PC, DS, PS2, PS3, Wii and Xbox 360`,
                    `Kung Fu Panda: Legendary Warriors for the DS and Wii`,
                    `the Kung Fu Panda 2 video game for the DS, PS3, Wii and Xbox 360`,
                    `Kung Fu Panda: Showdown of Legendary Legends for PC, Xbox One, PS3, PS4, 3DS and Wii U`,
                    `the Monsters vs. Aliens game for PC, PS3, Xbox 360, DS, Wii and PS2`,
                    `the How to Train Your Dragon video game for Wii, Xbox 360, PS3 and DS`,
                    `the How to Train Your Dragon video game for Wii, Wii U, Xbox 360, PS3 and 3DS`,
                    `Megamind: Ultimate Showdown for the PS3 and Xbox 360`,
                    `Megamind: Mega Team Unite for the Wii`,
                    `Megamind: The Blue Defender for the DS and PSP`,
                    `Rise of the Guardians: The Video Game for the PS3, Xbox 360, Wii, Wii U, DS and 3DS`,
                    `The Croods: Prehistoric Party! for the Wii U, Wii, DS and 3DS`,
                    `Turbo: Super Stunt Squad for the Wii, Wii U, DS, 3DS, PS3 and Xbox 360`,
                    `Casper the Friendly Ghost video game for the PS1, Sega Saturn, SNES, GB, 3DO, GBC, GBA and PC`,
                    `Casper: A Spirited Beginning Activity Center for the PC`,
                    `Casper: Friends Around the World for the PS1`,
                    `Casper: Spirit Dimensions for the PS2 and Gamecube`,
                    `Casper and the Ghostly Trio for the PS2`,
                    `the Casper's Scare School video game for the PS2, DS and Wii`,
                    `The Chronicles of Narnia: The Lion, the Witch and the Wardrobe video game for the Xbox, PS2, PC, GBA, Gamecube and DS`,
                    `E.T. the Extra-Terrestrial for the Atari 2600`,
                    `E.T. the Extra-Terrestrial for the TI-99/4A`,
                    `E.T. the Extra-Terrestrial for the GBA`,
                    `E.T. Go Home (UFI und sein gefährlicher Einsatz) for the Atari 2600`,
                    `E.T.: Digital Companion for the GBC`,
                    `E.T.: Escape from Planet Earth for the GBC`,
                    `E.T.: Interplanetary Mission for the PC and PS1`,
                    `E.T. and the Cosmic Garden`,
                    `E.T.: Away from Home for the PC`,
                    `E.T.: Phone Home Adventure for the PC`,
                    `E.T.: The Green Planet`,
                    `the Ghostbusters video game for the Atari 800, Commodore 64, MSX, ZX Spectrum, Amstrad CPC, Atari 2600 and Apple II`,
                    `The Real Ghostbusters for the Arcade`,
                    `the Ghostbusters video game for the NES, Sega Master System and Genesis`,
                    `Ghostbusters II for the NES, Atari 2600, Amiga, Commodore 64, MSX, PC, ZX Spectrum and Amstrad CPC`,
                    `New Ghostbusters II for the GB and NES`,
                    `the Real Ghostbusters for the GBA`,
                    `Ghostbusters: The Video Game for the PlayStation 3, PlayStation 2, PlayStation Portable, Xbox 360, Nintendo DS, Wii and PC`,
                    `Ghostbusters: Sanctum of Slime for PSN, Xbox Live and PC`,
                    `the Ghostbusters (2016) video game for the PS4, Xbox One and PC`,
                    `the Harry Potter and the Philosopher's Stone video game for the PS1, PS2, Xbox, Gamecube, GBC, GBA and PC`,
                    `the Harry Potter and the Chaber of Secrets video game for the PS1, PS2, Xbox, Gamecube, GBC, GBA and PC`,
                    `the Harry Potter and the Prisoner of Azkaban video game for the PS2, Xbox, Gamecube, GBA and PC`,
                    `the Harry Potter and the Goblet of Fire video game for the PS2, Xbox, Gamecube, DS, PSP, GBA and PC`,
                    `the Harry Potter and the Order of the Phoenix video game for the PS2, PS3, Xbox, Wii, GBA, PSP, DS and PC`,
                    `the Harry Potter and the Half-Blood Prince video game for the PS2, PS3, Xbox, Wii, PSP, DS and PC`,
                    `the Harry Potter and the Deathly Hallows - Part 1 video game for the PS3, Xbox 360, Wii, DS, and PC`,
                    `the Harry Potter and the Deathly Hallows - Part 2 video game for the PS3, Xbox 360, Wii, DS, and PC`,
                    `Harry Potter Quidditch World Cup for the PS2, Xbox, Gamecube, GBA and PC`,
                    `the Harry Potter video game for the Kinect`,
                    `the Jurassic Park video game for the NES, GB, SNES, Genesis, Game Gear, MAster System, Sega CD, Amiga and Arcade`,
                    `Jurassic Park 2: the Chaos Continues for the SNES and Game Boy`,
                    `Jurassic Park: Rampage Edition for the Sega Genesis`,
                    `The Lost World: Jurassic Park for the PS1, Sega Saturn and Arcade`,
                    `Warpath: Jurassic Park for the PS1`,
                    `Jurassic Park III: Dino Defender for the PC`,
                    `Jurassic Park III: Danger Zone! for the PC`,
                    `Jurassic Park III: Island Attack for the GBA`,
                    `Jurassic Park III: The DNA Factor for the GBA`,
                    `Jurassic Park III: Park Builder for the GBA`,
                    `Scan Command: Jurassic Park for the PC`,
                    `Jurassic Park: Dinosaur Battles for the PC`,
                    `Jurassic Park: Operation Genesis for the PS2, Xbox and PC`,
                    `Jurassic Park Institute Tour: Dinosaur Rescue for the GBA`,
                    `Jurassic Park: The Game for the PS3, Xbox 360 and PC`,
                    `Jurassic World Evolution for PSN, Xbox Live and PC`,
                    `the Disney's Lilo & Stitch video game for the GBA`,
                    `Motto! Stitch! DS: Rhythm de Rakugaki Daisakusen for the DS`,
                    `Disney's Lilo & Stitch: Trouble in Paradise for the PS1 and PC`,
                    `Disney's Stitch: Experiment 626 for the PS2`,
                    `Lilo & Stitch: Hawaiian Adventure for the PC`,
                    `Lilo & Stitch Pinball for the PC`,
                    `Lilo & Stitch 2: Hämsterviel Havoc for the GBA`,
                    `Disney Stitch Jam for the DS`,
                    `The Lion King video game for the Genesis, SNES, NES, GB, Amiga, PC, Game Gear and Master System`,
                    `The Lion King: Simba's Mighty Adventure for the GBC and PS1`,
                    `Timon & Pumbaa's Jungle Games for the SNES and PC`,
                    `The Lion King 1½ for the GBA`,
                    `Disney's Adventures in Typing With Timon and Pumbaa for the PC`,
                    `Pink Panther in Pink Goes To Hollywood for the SNES and Genesis`,
                    `The Pink Panther: Passport to Peril for the PC`,
                    `The Pink Panther: Hokus Pokus Pink for the PC`,
                    `the Pirates of the Caribbean: The Curse of the Black Pearl video game for the GBA`,
                    `Pirates of the Caribbean: The Game for the Xbox and PC`,
                    `Pirates of the Caribbean: Dead Man's Chest for the PSP, GBA and DS`,
                    `Pirates of the Caribbean: The Legend of Jack Sparrow for the PS2 and PC`,
                    `Pirates of the Caribbean: At World's End for the Wii, DS, Xbox 360, PSP, PS2, PS3 and PC`,
                    `the Spider-Man video game for the PS1, GBC, N64, Dreamcast and PC`,
                    `the Spider-Man 2 video game for the PS2, GBA, Gamecube, Xbox, DS, PSP, N-Gage and PC`,
                    `the Spider-Man 3 video game for the GBA, PC, DS, PS2, Wii, Xbox 360, Ps3 and PSP`,
                    `the Star Wars video game for the NES, GB, Master System, Game Gear, Arcade and Famicom`,
                    `the Disney's Tarzan video game for the PS1`,
                    `Tarzan: Untamed for the PS2 and Gamecube`,
                    `Tarzan Jungle Tumble for the PC`,
                    `Disney's Tarzan: Return to the Jungle for the PC`,
                    `The Wizard of Oz video game for the SNES`];

            var r = Math.floor((Math.random() * w.length));

            message.channel.send(`Recently purchased `+w[r]+`.`);
        }
    }

    //Yang
    if (command === `YANG` || command === `YANGGANG` || command === `DATA`) {
        message.channel.send('', { file: `https://cdn.discordapp.com/attachments/612061198288027796/636288862829805598/image0.jpg` });
    }


    //Leaderboards

    if (command === `LEADERBOARD` || command === `TOP` || command === `LEADERBOARD` || command === `TOP`) {
        var board = 'default';
        if (args[0] && args[0] != '') {
            if (args[0] === `HALLOWEENFULL` || args[0] === `OCTOBERFULL` || args[0] === `CANDYFULL` || args[0] === `TREATSFULL` || args[0] === `FULLHALLOWEEN` || args[0] === `FULLOCTOBER` || args[0] === `FULLCANDY` || args[0] === `FULLTREATS` || (args[0] === `HALLOWEEN` && args[1] === `FULL`) || (args[0] === `OCTOBER` && args[1] === `FULL`) || (args[0] === `CANDY` && args[1] === `FULL`) || (args[0] === `TREATS` && args[1] === `FULL`)) {
                board = 'halloween2020full';
            } else if (args[0] === `OLDCANDY` || args[0] === `OLDHALLOWEEN` || args[0] === `CANDY2019` || args[0] === `HALLOWEEN2019`) {
                board = 'halloween2019';
            } else if (args[0] === `HALLOWEEN` || args[0] === `OCTOBER` || args[0] === `CANDY` || args[0] === `TREATS`) {
                board = 'halloween2020';
            } else if (args[0] === `MESSAGE` || args[0] === `MESSAGES` || args[0] === `MSG` || args[0] === `MSGS`) {
                board = 'messages';
            } else if (args[0] === `SNOW` || args[0] === `SNOWBALL` || args[0] === `SNOWBALLS` || args[0] === `CHRISTMAS` || args[0] === `XMAS` || args[0] === `EVENT`) {
                board = 'christmas';
            } else if (args[0] === `TIMCOIN` || args[0] === `TC` || args[0] === `MONEY` || args[0] === `BALANCE`) {
                board = 'timcoin';
            }
        }

        if (board === 'halloween2019') {
            await lvl.Leaderboard({ /*limit: 10*/ }).then(async users => {
                console.log(users);
                if (users[0]) var firstplace = await client.fetchUser(users[0].userid);
                if (users[1]) var secondplace = await client.fetchUser(users[1].userid);
                if (users[2]) var thirdplace = await client.fetchUser(users[2].userid);
                if (users[3]) var fourthplace = await client.fetchUser(users[3].userid);
                if (users[4]) var fifthplace = await client.fetchUser(users[4].userid);
                if (users[5]) var sixthplace = await client.fetchUser(users[5].userid);
                if (users[6]) var seventhplace = await client.fetchUser(users[6].userid);
                if (users[7]) var eighthplace = await client.fetchUser(users[7].userid);
                if (users[8]) var ninthplace = await client.fetchUser(users[8].userid);
                if (users[9]) var tenthplace = await client.fetchUser(users[9].userid);
                if (users[21]) var twentysecondplace = await client.fetchUser(users[21].userid);

                message.channel.send(`**Candy Leaderboard**
1 - ${firstplace && firstplace.username || 'Nobody Yet'}: ${users[0] && users[0].level || '0'}
2 - ${secondplace && secondplace.username || 'Nobody Yet'}: ${users[1] && users[1].level || '0'}
3 - ${thirdplace && thirdplace.username || 'Nobody Yet'}: ${users[2] && users[2].level || '0'}
4 - ${fourthplace && fourthplace.username || 'Nobody Yet'}: ${users[3] && users[3].level || '0'}
5 - ${fifthplace && fifthplace.username || 'Nobody Yet'}: ${users[4] && users[4].level || '0'}
6 - ${sixthplace && sixthplace.username || 'Nobody Yet'}: ${users[5] && users[5].level || '0'}
7 - ${seventhplace && seventhplace.username || 'Nobody Yet'}: ${users[6] && users[6].level || '0'}
8 - ${eighthplace && eighthplace.username || 'Nobody Yet'}: ${users[7] && users[7].level || '0'}
9 - ${ninthplace && ninthplace.username || 'Nobody Yet'}: ${users[8] && users[8].level || '0'}
10 - ${tenthplace && tenthplace.username || 'Nobody Yet'}: ${users[9] && users[9].level || '0'}
22 - ${twentysecondplace && twentysecondplace.username || 'Nobody Yet'}: ${users[21] && users[21].level || '0'}`)
            })
        } else if (board === 'halloween2020') {
            await candy2020.Leaderboard({ /*limit: 10*/ }).then(async users => {
                console.log(users);
                if (users[0]) var firstplace = await client.fetchUser(users[0].userid);
                if (users[1]) var secondplace = await client.fetchUser(users[1].userid);
                if (users[2]) var thirdplace = await client.fetchUser(users[2].userid);
                if (users[3]) var fourthplace = await client.fetchUser(users[3].userid);
                if (users[4]) var fifthplace = await client.fetchUser(users[4].userid);
                if (users[5]) var sixthplace = await client.fetchUser(users[5].userid);
                if (users[6]) var seventhplace = await client.fetchUser(users[6].userid);
                if (users[7]) var eighthplace = await client.fetchUser(users[7].userid);
                if (users[8]) var ninthplace = await client.fetchUser(users[8].userid);
                if (users[9]) var tenthplace = await client.fetchUser(users[9].userid);
                if (users[21]) var twentysecondplace = await client.fetchUser(users[21].userid);

                var output = `**Candy Leaderboard**
1 - ${firstplace && message.guild.member(firstplace).displayName || 'Nobody Yet'}: ${users[0] && users[0].level || '0'}
2 - ${secondplace && message.guild.member(secondplace).displayName || 'Nobody Yet'}: ${users[1] && users[1].level || '0'}
3 - ${thirdplace && message.guild.member(thirdplace).displayName || 'Nobody Yet'}: ${users[2] && users[2].level || '0'}
4 - ${fourthplace && message.guild.member(fourthplace).displayName || 'Nobody Yet'}: ${users[3] && users[3].level || '0'}
5 - ${fifthplace && message.guild.member(fifthplace).displayName || 'Nobody Yet'}: ${users[4] && users[4].level || '0'}
6 - ${sixthplace && message.guild.member(sixthplace).displayName || 'Nobody Yet'}: ${users[5] && users[5].level || '0'}
7 - ${seventhplace && message.guild.member(seventhplace).displayName || 'Nobody Yet'}: ${users[6] && users[6].level || '0'}
8 - ${eighthplace && message.guild.member(eighthplace).displayName || 'Nobody Yet'}: ${users[7] && users[7].level || '0'}
9 - ${ninthplace && message.guild.member(ninthplace).displayName || 'Nobody Yet'}: ${users[8] && users[8].level || '0'}
10 - ${tenthplace && message.guild.member(tenthplace).displayName || 'Nobody Yet'}: ${users[9] && users[9].level || '0'}`;

                if (users[21].userid == 175333417481666571) output += `\n22 - stupid fucking bitch: ${users[21] && users[21].level || '0'}`;
                else output += `\n22 - ${twentysecondplace && message.guild.member(twentysecondplace).displayName || 'Nobody Yet'}: ${users[21] && users[21].level || '0'}`;

                message.channel.send(output)
            })
        } else if (board === 'halloween2020full') {
            if(message.channel.id != 612065359285059615) {
                message.channel.send('That is only allowed in #bot-commands');
                return;
            }
            await candy2020.Leaderboard({ /*limit: 10*/ }).then(async users => {
                console.log(users);
                if (users[0]) var firstplace = await client.fetchUser(users[0].userid);
                if (users[1]) var secondplace = await client.fetchUser(users[1].userid);
                if (users[2]) var thirdplace = await client.fetchUser(users[2].userid);
                if (users[3]) var fourthplace = await client.fetchUser(users[3].userid);
                if (users[4]) var fifthplace = await client.fetchUser(users[4].userid);
                if (users[5]) var sixthplace = await client.fetchUser(users[5].userid);
                if (users[6]) var seventhplace = await client.fetchUser(users[6].userid);
                if (users[7]) var eighthplace = await client.fetchUser(users[7].userid);
                if (users[8]) var ninthplace = await client.fetchUser(users[8].userid);
                if (users[9]) var tenthplace = await client.fetchUser(users[9].userid);
                if (users[10]) var place11 = await client.fetchUser(users[10].userid);
                if (users[11]) var place12 = await client.fetchUser(users[11].userid);
                if (users[12]) var place13 = await client.fetchUser(users[12].userid);
                if (users[13]) var place14 = await client.fetchUser(users[13].userid);
                if (users[14]) var place15 = await client.fetchUser(users[14].userid);
                if (users[15]) var place16 = await client.fetchUser(users[15].userid);
                if (users[16]) var place17 = await client.fetchUser(users[16].userid);
                if (users[17]) var place18 = await client.fetchUser(users[17].userid);
                if (users[18]) var place19 = await client.fetchUser(users[18].userid);
                if (users[19]) var place20 = await client.fetchUser(users[19].userid);
                if (users[20]) var place21 = await client.fetchUser(users[20].userid);
                if (users[21]) var twentysecondplace = await client.fetchUser(users[21].userid);
                if (users[22]) var place23 = await client.fetchUser(users[22].userid);
                if (users[23]) var place24 = await client.fetchUser(users[23].userid);
                if (users[24]) var place25 = await client.fetchUser(users[24].userid);
                if (users[25]) var place26 = await client.fetchUser(users[25].userid);
                if (users[26]) var place27 = await client.fetchUser(users[26].userid);
                if (users[27]) var place28 = await client.fetchUser(users[27].userid);
                if (users[28]) var place29 = await client.fetchUser(users[28].userid);
                if (users[29]) var place30 = await client.fetchUser(users[29].userid);

                var output = `**Candy Leaderboard**\n`;

                if(users[0].userid == 175333417481666571) output += `1 - stupid fucking bitch: ${users[0] && users[0].level || '0'}\n`;
                else output += `1 - ${firstplace && message.guild.member(firstplace).displayName || 'Nobody Yet'}: ${users[0] && users[0].level || '0'}\n`;

                if(users[1].userid == 175333417481666571) output += `2 - stupid fucking bitch: ${users[1] && users[1].level || '0'}\n`;
                else output += `2 - ${secondplace && message.guild.member(secondplace).displayName || 'Nobody Yet'}: ${users[1] && users[1].level || '0'}\n`;

                if(users[2].userid == 175333417481666571) output += `3 - stupid fucking bitch: ${users[2] && users[2].level || '0'}\n`;
                else output += `3 - ${thirdplace && message.guild.member(thirdplace).displayName || 'Nobody Yet'}: ${users[2] && users[2].level || '0'}\n`;

                if(users[3].userid == 175333417481666571) output += `4 - stupid fucking bitch: ${users[3] && users[3].level || '0'}\n`;
                else output += `4 - ${fourthplace && message.guild.member(fourthplace).displayName || 'Nobody Yet'}: ${users[3] && users[3].level || '0'}\n`;

                if(users[4].userid == 175333417481666571) output += `5 - stupid fucking bitch: ${users[4] && users[4].level || '0'}\n`;
                else output += `5 - ${fifthplace && message.guild.member(fifthplace).displayName || 'Nobody Yet'}: ${users[4] && users[4].level || '0'}\n`;

                if(users[5].userid == 175333417481666571) output += `6 - stupid fucking bitch: ${users[5] && users[5].level || '0'}\n`;
                else output += `6 - ${sixthplace && message.guild.member(sixthplace).displayName || 'Nobody Yet'}: ${users[5] && users[5].level || '0'}\n`;

                if(users[6].userid == 175333417481666571) output += `7 - stupid fucking bitch: ${users[6] && users[6].level || '0'}\n`;
                else output += `7 - ${seventhplace && message.guild.member(seventhplace).displayName || 'Nobody Yet'}: ${users[6] && users[6].level || '0'}\n`;

                if(users[7].userid == 175333417481666571) output += `8 - stupid fucking bitch: ${users[7] && users[7].level || '0'}\n`;
                else output += `8 - ${eighthplace && message.guild.member(eighthplace).displayName || 'Nobody Yet'}: ${users[7] && users[7].level || '0'}\n`;

                if(users[8].userid == 175333417481666571) output += `9 - stupid fucking bitch: ${users[8] && users[8].level || '0'}\n`;
                else output += `9 - ${ninthplace && message.guild.member(ninthplace).displayName || 'Nobody Yet'}: ${users[8] && users[8].level || '0'}\n`;

                if(users[9].userid == 175333417481666571) output += `10 - stupid fucking bitch: ${users[9] && users[9].level || '0'}\n`;
                else output += `10 - ${tenthplace && message.guild.member(tenthplace).displayName || 'Nobody Yet'}: ${users[9] && users[9].level || '0'}\n`;

                if(users[10].userid == 175333417481666571) output += `11 - stupid fucking bitch: ${users[10] && users[10].level || '0'}\n`;
                else output += `11 - ${place11 && message.guild.member(place11).displayName || 'Nobody Yet'}: ${users[10] && users[10].level || '0'}\n`;

                if(users[11].userid == 175333417481666571) output += `12 - stupid fucking bitch: ${users[11] && users[11].level || '0'}\n`;
                else output += `12 - ${place12 && message.guild.member(place12).displayName || 'Nobody Yet'}: ${users[11] && users[11].level || '0'}\n`;

                if(users[12].userid == 175333417481666571) output += `13 - stupid fucking bitch: ${users[12] && users[12].level || '0'}\n`;
                else output += `13 - ${place13 && message.guild.member(place13).displayName || 'Nobody Yet'}: ${users[12] && users[12].level || '0'}\n`;

                if(users[13].userid == 175333417481666571) output += `14 - stupid fucking bitch: ${users[13] && users[13].level || '0'}\n`;
                else output += `14 - ${place14 && message.guild.member(place14).displayName || 'Nobody Yet'}: ${users[13] && users[13].level || '0'}\n`;

                if(users[14].userid == 175333417481666571) output += `15 - stupid fucking bitch: ${users[14] && users[14].level || '0'}\n`;
                else output += `15 - ${place15 && message.guild.member(place15).displayName || 'Nobody Yet'}: ${users[14] && users[14].level || '0'}\n`;

                if(users[15].userid == 175333417481666571) output += `16 - stupid fucking bitch: ${users[15] && users[15].level || '0'}\n`;
                else output += `16 - ${place16 && message.guild.member(place16).displayName || 'Nobody Yet'}: ${users[15] && users[15].level || '0'}\n`;

                if(users[16].userid == 175333417481666571) output += `17 - stupid fucking bitch: ${users[16] && users[16].level || '0'}\n`;
                else output += `17 - ${place17 && message.guild.member(place17).displayName || 'Nobody Yet'}: ${users[16] && users[16].level || '0'}\n`;

                if(users[17].userid == 175333417481666571) output += `18 - stupid fucking bitch: ${users[17] && users[17].level || '0'}\n`;
                else output += `18 - ${place18 && message.guild.member(place18).displayName || 'Nobody Yet'}: ${users[17] && users[17].level || '0'}\n`;

                if(users[18].userid == 175333417481666571) output += `19 - stupid fucking bitch: ${users[18] && users[18].level || '0'}\n`;
                else output += `19 - ${place19 && message.guild.member(place19).displayName || 'Nobody Yet'}: ${users[18] && users[18].level || '0'}\n`;

                if(users[19].userid == 175333417481666571) output += `20 - stupid fucking bitch: ${users[19] && users[19].level || '0'}\n`;
                else output += `20 - ${place20 && message.guild.member(place20).displayName || 'Nobody Yet'}: ${users[19] && users[19].level || '0'}\n`;

                if(users[20].userid == 175333417481666571) output += `21 - stupid fucking bitch: ${users[20] && users[20].level || '0'}\n`;
                else output += `21 - ${place21 && message.guild.member(place21).displayName || 'Nobody Yet'}: ${users[20] && users[20].level || '0'}\n`;

                if(users[21].userid == 175333417481666571) output += `22 - stupid fucking bitch: ${users[21] && users[21].level || '0'}\n`;
                else output += `22 - ${twentysecondplace && message.guild.member(twentysecondplace).displayName || 'Nobody Yet'}: ${users[21] && users[21].level || '0'}\n`;

                if(users[22].userid == 175333417481666571) output += `23 - stupid fucking bitch: ${users[22] && users[22].level || '0'}\n`;
                else output += `23 - ${place23 && message.guild.member(place23).displayName || 'Nobody Yet'}: ${users[22] && users[22].level || '0'}\n`;

                if(users[23].userid == 175333417481666571) output += `24 - stupid fucking bitch: ${users[23] && users[23].level || '0'}\n`;
                else output += `24 - ${place24 && message.guild.member(place24).displayName || 'Nobody Yet'}: ${users[23] && users[23].level || '0'}\n`;

                if(users[24].userid == 175333417481666571) output += `25 - stupid fucking bitch: ${users[24] && users[24].level || '0'}\n`;
                else output += `25 - ${place25 && message.guild.member(place25).displayName || 'Nobody Yet'}: ${users[24] && users[24].level || '0'}\n`;

                if(users[25].userid == 175333417481666571) output += `26 - stupid fucking bitch: ${users[25] && users[25].level || '0'}\n`;
                else output += `26 - ${place26 && message.guild.member(place26).displayName || 'Nobody Yet'}: ${users[25] && users[25].level || '0'}\n`;

                if(users[26].userid == 175333417481666571) output += `27 - stupid fucking bitch: ${users[26] && users[26].level || '0'}\n`;
                else output += `27 - ${place27 && message.guild.member(place27).displayName || 'Nobody Yet'}: ${users[26] && users[26].level || '0'}\n`;

                if(users[27].userid == 175333417481666571) output += `28 - stupid fucking bitch: ${users[27] && users[27].level || '0'}\n`;
                else output += `28 - ${place28 && message.guild.member(place28).displayName || 'Nobody Yet'}: ${users[27] && users[27].level || '0'}\n`;

                if(users[28].userid == 175333417481666571) output += `29 - stupid fucking bitch: ${users[28] && users[28].level || '0'}\n`;
                else output += `29 - ${place29 && message.guild.member(place29).displayName || 'Nobody Yet'}: ${users[28] && users[28].level || '0'}\n`;

                if(users[29].userid == 175333417481666571) output += `30 - stupid fucking bitch: ${users[29] && users[29].level || '0'}\n`;
                else output += `30 - ${place30 && message.guild.member(place30).displayName || 'Nobody Yet'}: ${users[29] && users[29].level || '0'}\n`;

                message.channel.send(output);
                /*message.channel.send(`**Candy Leaderboard**
1 - ${firstplace && message.guild.member(firstplace).displayName || 'Nobody Yet'}: ${users[0] && users[0].level || '0'}
2 - ${secondplace && message.guild.member(secondplace).displayName || 'Nobody Yet'}: ${users[1] && users[1].level || '0'}
3 - ${thirdplace && message.guild.member(thirdplace).displayName || 'Nobody Yet'}: ${users[2] && users[2].level || '0'}
4 - ${fourthplace && message.guild.member(fourthplace).displayName || 'Nobody Yet'}: ${users[3] && users[3].level || '0'}
5 - ${fifthplace && message.guild.member(fifthplace).displayName || 'Nobody Yet'}: ${users[4] && users[4].level || '0'}
6 - ${sixthplace && message.guild.member(sixthplace).displayName || 'Nobody Yet'}: ${users[5] && users[5].level || '0'}
7 - ${seventhplace && message.guild.member(seventhplace).displayName || 'Nobody Yet'}: ${users[6] && users[6].level || '0'}
8 - ${eighthplace && message.guild.member(eighthplace).displayName || 'Nobody Yet'}: ${users[7] && users[7].level || '0'}
9 - ${ninthplace && message.guild.member(ninthplace).displayName || 'Nobody Yet'}: ${users[8] && users[8].level || '0'}
10 - ${tenthplace && message.guild.member(tenthplace).displayName || 'Nobody Yet'}: ${users[9] && users[9].level || '0'}
11 - ${place11 && message.guild.member(place11).displayName || 'Nobody Yet'}: ${users[10] && users[10].level || '0'}
12 - ${place12 && message.guild.member(place12).displayName || 'Nobody Yet'}: ${users[11] && users[11].level || '0'}
13 - ${place13 && message.guild.member(place13).displayName || 'Nobody Yet'}: ${users[12] && users[12].level || '0'}
14 - ${place14 && message.guild.member(place14).displayName || 'Nobody Yet'}: ${users[13] && users[13].level || '0'}
15 - ${place15 && message.guild.member(place15).displayName || 'Nobody Yet'}: ${users[14] && users[14].level || '0'}
16 - ${place16 && message.guild.member(place16).displayName || 'Nobody Yet'}: ${users[15] && users[15].level || '0'}
17 - ${place17 && message.guild.member(place17).displayName || 'Nobody Yet'}: ${users[16] && users[16].level || '0'}
18 - ${place18 && message.guild.member(place18).displayName || 'Nobody Yet'}: ${users[17] && users[17].level || '0'}
19 - ${place19 && message.guild.member(place19).displayName || 'Nobody Yet'}: ${users[18] && users[18].level || '0'}
20 - ${place20 && message.guild.member(place20).displayName || 'Nobody Yet'}: ${users[19] && users[19].level || '0'}
21 - ${place21 && message.guild.member(place21).displayName || 'Nobody Yet'}: ${users[20] && users[20].level || '0'}
22 - ${twentysecondplace && message.guild.member(twentysecondplace).displayName || 'Nobody Yet'}: ${users[21] && users[21].level || '0'}
23 - ${place23 && message.guild.member(place23).displayName || 'Nobody Yet'}: ${users[22] && users[22].level || '0'}
24 - ${place24 && message.guild.member(place24).displayName || 'Nobody Yet'}: ${users[23] && users[23].level || '0'}
25 - ${place25 && message.guild.member(place25).displayName || 'Nobody Yet'}: ${users[24] && users[24].level || '0'}
26 - ${place26 && message.guild.member(place26).displayName || 'Nobody Yet'}: ${users[25] && users[25].level || '0'}
27 - ${place27 && message.guild.member(place27).displayName || 'Nobody Yet'}: ${users[26] && users[26].level || '0'}
28 - ${place28 && message.guild.member(place28).displayName || 'Nobody Yet'}: ${users[27] && users[27].level || '0'}
29 - ${place29 && message.guild.member(place29).displayName || 'Nobody Yet'}: ${users[28] && users[28].level || '0'}
30 - ${place30 && message.guild.member(place30).displayName || 'Nobody Yet'}: ${users[29] && users[29].level || '0'}`)*/
            })
            //await lvl.Leaderboard({ /*limit: 10*/ }).then(async users => {
            //    var outputMessage = `**Candy Leaderboard**\n`;
            //    var counter = 1;
            //    users.forEach(async user => {
            //        if (user) var place = await client.fetchUser(user.userid);
            //        outputMessage += `${counter} - ${place && /*message.guild.member(place).displayName*/ place.username || 'Nobody Yet'}: ${user && user.level || '0'}\n`;
            //        counter++;
            //    })
            //    message.channel.send(outputMessage);
            //})
        } else if (board === 'christmas') {
            await snowlvl.Leaderboard({ }).then(async users => {
                console.log(users);
                if (users[0]) var firstplace = await client.fetchUser(users[0].userid);
                if (users[1]) var secondplace = await client.fetchUser(users[1].userid);
                if (users[2]) var thirdplace = await client.fetchUser(users[2].userid);
                if (users[3]) var fourthplace = await client.fetchUser(users[3].userid);
                if (users[4]) var fifthplace = await client.fetchUser(users[4].userid);
                if (users[5]) var sixthplace = await client.fetchUser(users[5].userid);
                if (users[6]) var seventhplace = await client.fetchUser(users[6].userid);
                if (users[7]) var eighthplace = await client.fetchUser(users[7].userid);
                if (users[8]) var ninthplace = await client.fetchUser(users[8].userid);
                if (users[9]) var tenthplace = await client.fetchUser(users[9].userid);
                if (users[10]) var eleventhplace = await client.fetchUser(users[10].userid);
                if (users[11]) var twelfthplace = await client.fetchUser(users[11].userid);

                let firstteam = fetchTeamName(fetchTeam(users[0].userid));
                let secondteam = fetchTeamName(fetchTeam(users[1].userid));
                let thirdteam = fetchTeamName(fetchTeam(users[2].userid));
                let fourthteam = fetchTeamName(fetchTeam(users[3].userid));
                let fifthteam = fetchTeamName(fetchTeam(users[4].userid));
                let sixthteam = fetchTeamName(fetchTeam(users[5].userid));
                let seventhteam = fetchTeamName(fetchTeam(users[6].userid));
                let eigthteam = fetchTeamName(fetchTeam(users[7].userid));
                let ninthteam = fetchTeamName(fetchTeam(users[8].userid));
                let tenthteam = fetchTeamName(fetchTeam(users[9].userid));
                let eleventhteam = fetchTeamName(fetchTeam(users[10].userid));
                let twelfthteam = fetchTeamName(fetchTeam(users[11].userid));

                message.channel.send(`**Snowball Fight Leaderboard**
1 - ${firstteam}: ${users[0] && users[0].level || '0'}
2 - ${secondteam}: ${users[1] && users[1].level || '0'}
3 - ${thirdteam}: ${users[2] && users[2].level || '0'}
4 - ${fourthteam}: ${users[3] && users[3].level || '0'}
5 - ${fifthteam}: ${users[4] && users[4].level || '0'}
6 - ${sixthteam}: ${users[5] && users[5].level || '0'}
7 - ${seventhteam}: ${users[6] && users[6].level || '0'}
8 - ${eigthteam}: ${users[7] && users[7].level || '0'}
9 - ${ninthteam}: ${users[8] && users[8].level || '0'}
10 - ${tenthteam}: ${users[9] && users[9].level || '0'}
11 - ${eleventhteam}: ${users[10] && users[10].level || '0'}
12 - ${twelfthteam}: ${users[11] && users[11].level || '0'}`)
            })
        } else if (board === 'timcoin') {
            await ecolvl.Leaderboard({ limit: 10 }).then(async users => {
                console.log(users);
                if (users[0]) var firstplace = await client.fetchUser(users[0].userid);
                if (users[1]) var secondplace = await client.fetchUser(users[1].userid);
                if (users[2]) var thirdplace = await client.fetchUser(users[2].userid);
                if (users[3]) var fourthplace = await client.fetchUser(users[3].userid);
                if (users[4]) var fifthplace = await client.fetchUser(users[4].userid);
                if (users[5]) var sixthplace = await client.fetchUser(users[5].userid);
                if (users[6]) var seventhplace = await client.fetchUser(users[6].userid);
                if (users[7]) var eighthplace = await client.fetchUser(users[7].userid);
                if (users[8]) var ninthplace = await client.fetchUser(users[8].userid);
                if (users[9]) var tenthplace = await client.fetchUser(users[9].userid);

                message.channel.send(`**TimCoin Leaderboard**
1 - ${firstplace && firstplace.username || 'Nobody Yet'}: ${users[0] && users[0].level || '0'}
2 - ${secondplace && secondplace.username || 'Nobody Yet'}: ${users[1] && users[1].level || '0'}
3 - ${thirdplace && thirdplace.username || 'Nobody Yet'}: ${users[2] && users[2].level || '0'}
4 - ${fourthplace && fourthplace.username || 'Nobody Yet'}: ${users[3] && users[3].level || '0'}
5 - ${fifthplace && fifthplace.username || 'Nobody Yet'}: ${users[4] && users[4].level || '0'}
6 - ${sixthplace && sixthplace.username || 'Nobody Yet'}: ${users[5] && users[5].level || '0'}
7 - ${seventhplace && seventhplace.username || 'Nobody Yet'}: ${users[6] && users[6].level || '0'}
8 - ${eighthplace && eighthplace.username || 'Nobody Yet'}: ${users[7] && users[7].level || '0'}
9 - ${ninthplace && ninthplace.username || 'Nobody Yet'}: ${users[8] && users[8].level || '0'}
10 - ${tenthplace && tenthplace.username || 'Nobody Yet'}: ${users[9] && users[9].level || '0'}`)
            })
        } else if (board === 'messages' || board === 'default') {
            await msglvl.Leaderboard({ /*limit: 10*/ }).then(async users => {
                console.log(users);
                if (users[0]) var firstplace = await client.fetchUser(users[0].userid);
                if (users[1]) var secondplace = await client.fetchUser(users[1].userid);
                if (users[2]) var thirdplace = await client.fetchUser(users[2].userid);
                if (users[3]) var fourthplace = await client.fetchUser(users[3].userid);
                if (users[4]) var fifthplace = await client.fetchUser(users[4].userid);
                if (users[5]) var sixthplace = await client.fetchUser(users[5].userid);
                if (users[6]) var seventhplace = await client.fetchUser(users[6].userid);
                if (users[7]) var eighthplace = await client.fetchUser(users[7].userid);
                if (users[8]) var ninthplace = await client.fetchUser(users[8].userid);
                if (users[9]) var tenthplace = await client.fetchUser(users[9].userid);

                message.channel.send(`**Message Leaderboard**
1 - ${firstplace && firstplace.username || 'Nobody Yet'}: ${users[0] && users[0].level || '0'}
2 - ${secondplace && secondplace.username || 'Nobody Yet'}: ${users[1] && users[1].level || '0'}
3 - ${thirdplace && thirdplace.username || 'Nobody Yet'}: ${users[2] && users[2].level || '0'}
4 - ${fourthplace && fourthplace.username || 'Nobody Yet'}: ${users[3] && users[3].level || '0'}
5 - ${fifthplace && fifthplace.username || 'Nobody Yet'}: ${users[4] && users[4].level || '0'}
6 - ${sixthplace && sixthplace.username || 'Nobody Yet'}: ${users[5] && users[5].level || '0'}
7 - ${seventhplace && seventhplace.username || 'Nobody Yet'}: ${users[6] && users[6].level || '0'}
8 - ${eighthplace && eighthplace.username || 'Nobody Yet'}: ${users[7] && users[7].level || '0'}
9 - ${ninthplace && ninthplace.username || 'Nobody Yet'}: ${users[8] && users[8].level || '0'}
10 - ${tenthplace && tenthplace.username || 'Nobody Yet'}: ${users[9] && users[9].level || '0'}`)
            })
        }
    }

    if (command === `RANK` || command === `MYRANK`) {
        var rank = 'default';
        if (args[0] && args[0] != '') {
            if (args[0] === `HALLOWEEN` || args[0] === `OCTOBER` || args[0] === `CANDY` || args[0] === `TREATS`) {
                rank = 'halloween2020';
            } else if (args[0] === `OLDCANDY` || args[0] === `OLDHALLOWEEN` || args[0] === `HALLOWEEN2019` || args[0] === `CANDY2019`) {
                rank = 'halloween2019';
            } else if (args[0] === `MESSAGE` || args[0] === `MESSAGES` || args[0] === `MSG` || args[0] === `MSGS`) {
                rank = 'messages';
            } else if (args[0] === `SNOW` || args[0] === `SNOWBALL` || args[0] === `SNOWBALLS` || args[0] === `CHRISTMAS` || args[0] === `XMAS` || args[0] === `EVENT`) {
                rank = 'christmas';
            } else if (args[0] === `TC` || args[0] === `TIMCOIN` || args[0] === `MONEY` || args[0] === `BALANCE`) {
                rank = 'timcoin';
            }
        }

        if (rank === 'halloween2019') {
            var output = await lvl.Leaderboard({
                search: message.author.id
            });

            var balance = await lvl.Fetch(message.author.id)

            message.channel.send(`You are rank ${output} with ${balance.level} candies.`);
        } else if (rank === 'halloween2020') {
            var output = await candy2020.Leaderboard({
                search: message.author.id
            });

            var balance = await candy2020.Fetch(message.author.id)

            message.channel.send(`You are rank ${output} with ${balance.level} candies.`);
        } else if (rank === 'christmas') {
            var output = await snowlvl.Leaderboard({
                search: fetchTeamFirstMember(fetchTeam(message.author.id))
            });

            var balance = await snowlvl.Fetch(fetchTeamFirstMember(fetchTeam(message.author.id)));
            var teamName = fetchTeamName(fetchTeam(message.author.id));

            message.channel.send(`${teamName} is rank ${output} with a score of ${balance.level}.`);
        } else if (rank === 'timcoin') {
            var output = await ecolvl.Leaderboard({
                search: message.author.id
            });

            var balance = await ecolvl.Fetch(message.author.id);

            message.channel.send(`You are rank ${output} with ${balance.level} TimCoin.`);
        } else if (rank === 'messages' || rank === 'default') {
            var output = await msglvl.Leaderboard({
                search: message.author.id
            });

            var balance = await msglvl.Fetch(message.author.id)

            message.channel.send(`You are rank ${output} with ${balance.level} messages.`);
        }
    }

    if (command === `TEAM`) {
        var teamId = fetchTeam(message.author.id);
        console.log('Team ID: '+teamId);
        var output = await snowlvl.Leaderboard({
            search: fetchTeamFirstMember(teamId)
        });

        var balance = await snowlvl.Fetch(fetchTeamFirstMember(teamId));
        var teamName = fetchTeamName(teamId);

        message.channel.send(`You are a part of ${teamName} and are rank ${output} with a score of ${balance.level}.`);
    }


    //Netplay

    if(command === `NETPLAY` || command === `PLAY`) {
        var netplayMessage = `${sender.username} would like to play! `;

        if (message.member.roles.find(`name`, `VS-NW`)) {
            let role = message.guild.roles.find(`name`, `N-NW`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-CT`)) {
            let role = message.guild.roles.find(`name`, `N-CT`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-NE`)) {
            let role = message.guild.roles.find(`name`, `N-NE`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-SW`)) {
            let role = message.guild.roles.find(`name`, `N-SW`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-MW`)) {
            let role = message.guild.roles.find(`name`, `N-MW`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-SE`)) {
            let role = message.guild.roles.find(`name`, `N-SE`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-S`)) {
            let role = message.guild.roles.find(`name`, `N-S`);
            netplayMessage += `${role} `;
        }
        if (message.member.roles.find(`name`, `VS-EU`)) {
            let role = message.guild.roles.find(`name`, `N-EU`);
            netplayMessage += `${role} `;
        }

        message.channel.send(netplayMessage);
    }

    if(command === `OPTIN` || command === `OPT-IN`) {
        if(!args[0]) {
            const embed = new Discord.RichEmbed()
                .setTitle(`Netplay Roles`)
                .setColor(0x00BECC)
                .setDescription(`Add an N-XX role to be notified when someone is searching for players in your region. Add a VS-XX role to search for that region when you use t!netplay`)
                .addField(`Northwest`, `N-NW | VS-NW`, true)
                .addField(`Central`, `N-CT | VS-CT`, true)
                .addField(`Northeast`, `N-NE | VS-NE`, true)
                .addField(`Southwest`, `N-SW | VS-SW`, true)
                .addField(`Midwest`, `N-MW | VS-MW`, true)
                .addField(`Southeast`, `N-SE | VS-SE`, true)
                .addField(`South`, `N-S | VS-S`, true)
                .addField(`Europe`, `N-EU | VS-EU`, true)
            message.channel.send({embed});
        } else if (args[0] === `N-NW` || args[0] === `VS-NW` || args[0] === `N-CT` || args[0] === `VS-CT` || args[0] === `N-NE` || args[0] === `VS-NE` || args[0] === `N-SW` || args[0] === `VS-SW` || args[0] === `N-MW` || args[0] === `VS-MW` || args[0] === `N-SE` || args[0] === `VS-SE` || args[0] === `N-S` || args[0] === `VS-S` || args[0] === `N-EU` || args[0] === `VS-EU`) {
            var role = message.guild.roles.find(`name`, args[0]);

            message.member.addRole(role);

            message.channel.send(`Successfully added the `+args[0]+` role.`);
        } else {
            message.channel.send(`Error: invalid role`);
        }
    }

    if(command === `OPTOUT` || command === `OPT-OUT`) {
        if (args[0] === `N-NW` || args[0] === `VS-NW` || args[0] === `N-CT` || args[0] === `VS-CT` || args[0] === `N-NE` || args[0] === `VS-NE` || args[0] === `N-SW` || args[0] === `VS-SW` || args[0] === `N-MW` || args[0] === `VS-MW` || args[0] === `N-SE` || args[0] === `VS-SE` || args[0] === `N-S` || args[0] === `VS-S` || args[0] === `N-EU` || args[0] === `VS-EU`) {
            var role = message.guild.roles.find(`name`, args[0]);

            message.member.removeRole(role);

            message.channel.send(`Successfully removed the `+args[0]+` role.`);
        } else {
            message.channel.send(`Error: invalid role`);
        }
    }


    //Messages

    /*if (command === `MESSAGEINIT`) {
        if (!message.member.roles.find("name", modRole)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: incorrect permissions')
                .setDescription('This command requires the ' + modRole + ' role.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Risc
        await msglvl.AddLevel(185839155438157832, 12188);
        await msglvl.SetXp(185839155438157832, 1);

        //Draco
        await msglvl.AddLevel(177545664757104640, 7331);
        await msglvl.SetXp(177545664757104640, 1);

        //Coffee
        await msglvl.AddLevel(562824176700882964, 12173);
        await msglvl.SetXp(562824176700882964, 1);

        //ADLP
        await msglvl.AddLevel(167375258012221441, 2944);
        await msglvl.SetXp(167375258012221441, 1);

        //Airplane
        await msglvl.AddLevel(212018836474560513, 5767);
        await msglvl.SetXp(212018836474560513, 1);

        //AL
        await msglvl.AddLevel(343953414335496195, 14954);
        await msglvl.SetXp(343953414335496195, 1);

        //Struc
        await msglvl.AddLevel(437179896813584387, 11255);
        await msglvl.SetXp(437179896813584387, 1);

        //Bjart
        await msglvl.AddLevel(197027859238354944, 12);
        await msglvl.SetXp(197027859238354944, 1);

        //Wub
        await msglvl.AddLevel(91304895465926656, 20051);
        await msglvl.SetXp(91304895465926656, 1);

        //Brio
        await msglvl.AddLevel(129820441014435840, 3065);
        await msglvl.SetXp(129820441014435840, 1);

        //Cag
        await msglvl.AddLevel(151811295711068161, 5392);
        await msglvl.SetXp(151811295711068161, 1);

        //Bubbles
        await msglvl.AddLevel(172862174979555331, 2317);
        await msglvl.SetXp(172862174979555331, 1);

        //Darsh
        await msglvl.AddLevel(151073927798587394, 16684);
        await msglvl.SetXp(151073927798587394, 1);

        //Coriamon
        await msglvl.AddLevel(136999091354861569, 1229);
        await msglvl.SetXp(136999091354861569, 1);

        //Drew
        await msglvl.AddLevel(368817136182886411, 5719);
        await msglvl.SetXp(368817136182886411, 1);

        //Ted
        await msglvl.AddLevel(246994286145437696, 991);
        await msglvl.SetXp(246994286145437696, 1);

        //Soap
        await msglvl.AddLevel(174695854924365824, 8320);
        await msglvl.SetXp(174695854924365824, 1);

        //Goiter
        await msglvl.AddLevel(602985157061771333, 4);
        await msglvl.SetXp(602985157061771333, 1);

        //Illusion
        await msglvl.AddLevel(72734539834720256, 12670);
        await msglvl.SetXp(72734539834720256, 1);

        337284886039625728
        //Sugden
        await msglvl.AddLevel(337284886039625728, 35175);
        await msglvl.SetXp(337284886039625728, 1);

        //Anti
        await msglvl.AddLevel(209457088240418817, 10293);
        await msglvl.SetXp(209457088240418817, 1);

        //Cael
        await msglvl.AddLevel(247185195692720128, 8146);
        await msglvl.SetXp(247185195692720128, 1);

        //Dimi
        await msglvl.AddLevel(324723893635907584, 9681);
        await msglvl.SetXp(324723893635907584, 1);

        //SubF
        await msglvl.AddLevel(196333675460296704, 17700);
        await msglvl.SetXp(196333675460296704, 1);

        //Cuck
        await msglvl.AddLevel(175333417481666571, 2508);
        await msglvl.SetXp(175333417481666571, 1);

        //Midnight
        await msglvl.AddLevel(202258713002639360, 5638);
        await msglvl.SetXp(202258713002639360, 1);

        //Loscar
        await msglvl.AddLevel(177461438921703434, 10469);
        await msglvl.SetXp(177461438921703434, 1);

        //Zeno
        await msglvl.AddLevel(183963049512796160, 48);
        await msglvl.SetXp(183963049512796160, 1);

        //Farmstink
        await msglvl.AddLevel(239503073586708481, 1478);
        await msglvl.SetXp(239503073586708481, 1);

        //Restingcarcass
        await msglvl.AddLevel(566828080576987156, 62);
        await msglvl.SetXp(566828080576987156, 1);

        //Rognut
        await msglvl.AddLevel(253204535433101323, 2427);
        await msglvl.SetXp(253204535433101323, 1);

        //Rootnut
        await msglvl.AddLevel(480605174759686164, 1790);
        await msglvl.SetXp(480605174759686164, 1);

        //Winnarly
        await msglvl.AddLevel(80434004188200960, 666);
        await msglvl.SetXp(80434004188200960, 1);
    }*/

    if (command === `MESSAGEADD`) {
        if (!message.member.roles.find("name", modRole)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: incorrect permissions')
                .setDescription('This command requires the ' + modRole + ' role.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        let firstMentioned = message.mentions.users.first();

        await msglvl.SetXp(firstMentioned.id, 1);
        await msglvl.SetXp(firstMentioned.id, 1);
        var output = await msglvl.AddLevel(firstMentioned.id, args[0]);

        message.channel.send(`id ${output.userid} now has ${output.newlevel}`);
    }


    //Silverbux / TimCoin

    if (command === `BALANCE` || command === `BAL` || command === `MONEY` || command === `SILVERBUX` || command === `TIMCOIN` || command === `SBUX` || command === `BUX`) {
        var results = await eco.FetchBalance(sender.id);

        const embed = new Discord.RichEmbed()
            .setTitle(`${sender.username}\'s Balance`)
            .setColor(0xF1C40F)
            .addField(currencyName, `${results.balance}`, true)
        message.channel.send({embed});
    }

    if (command === `CHECKBAL`) {
        if (!message.member.roles.find("name", modRole) && !message.member.roles.find("name", bankRole)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: incorrect permissions')
                .setDescription('This command requires the ' + modRole + ' role.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        var results = await eco.FetchBalance(message.mentions.users.first().id);

        message.channel.send(results.balance);
    }

    if (command === `INIT`) {
        if (!message.member.roles.find("name", modRole)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: incorrect permissions')
                .setDescription('This command requires the ' + modRole + ' role.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        var defineduser = '';
        if (!args[1]) { //If they didn't define anyone, add it to their own balance
            defineduser = sender;
        } else { //If they define someone, run this
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned;
        }

        var output = await eco.FetchBalance(defineduser.id);

        if (output.balance == 0) { //User does not have a balance
            var results = await eco.SetBalance(defineduser.id, 100);

            const embed = new Discord.RichEmbed()
                .setTitle(`${defineduser.username}\'s Balance`)
                .setColor(0xF1C40F)
                .addField(currencyName, `${results.balance}`, true)
            message.channel.send({embed});
        } else { //User already has a balance
            message.channel.send(`Error: This user already has a balance`);
        }
    }

    if (command === `ADD`) {
        //Check for better mod
        if (!message.member.roles.find("name", modRole) && !message.member.roles.find("name", bankRole)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: incorrect permissions')
                .setDescription('This command requires the ' + modRole + ' role.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Check if they defined an amount
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no amount provided')
                .setDescription(`This command requires an amount of ${currencyName} to add. \nExample: \`${prefix2}add <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Make sure args[0] is a number
        if (isNaN(args[0])) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: not a number')
                .setDescription(`This command requires an amount of ${currencyName} to add. Example: \`${prefix2}add <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        var defineduser = '';
        if (!args[1]) { //If they didn't define anyone, add it to their own balance
            defineduser = sender;
        } else { //If they define someone, run this
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned;
        }

        var results = await eco.AddToBalance(defineduser.id, args[0]);
        await ecolvl.SetXp(defineduser.id, 1);
        await ecolvl.SetLevel(defineduser.id, results.newbalance);

        const embed = new Discord.RichEmbed()
            .setTitle(`${defineduser.username}\'s Balance`)
            .setColor(0xF1C40F)
            .addField(currencyName, `${results.newbalance}`, true)
        message.channel.send({embed});
    }

    if (command === `SUBTRACT`) {
        //Check for better mod
        if (!message.member.roles.find("name", modRole) && !message.member.roles.find("name", bankRole)) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: incorrect permissions')
                .setDescription('This command requires the ' + modRole + ' role.')
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Check if they defined an amount
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no amount provided')
                .setDescription(`This command requires an amount of ${currencyName} to subtract. \nExample: \`${prefix2}sub <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Make sure args[0] is a number
        if (isNaN(args[0])) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: not a number')
                .setDescription(`This command requires an amount of ${currencyName} to subtract. Example: \`${prefix2}sub <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        var defineduser = '';
        if (!args[1]) { //If they didn't define anyone, add it to their own balance
            defineduser = sender;
        } else { //If they define someone, run this
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned;
        }

        var results = await eco.SubstractFromBalance(defineduser.id, args[0]);
        await ecolvl.SetXp(defineduser.id, 1);
        await ecolvl.SetLevel(defineduser.id, results.newbalance);

        const embed = new Discord.RichEmbed()
            .setTitle(`${defineduser.username}\'s Balance`)
            .setColor(0xF1C40F)
            .addField(currencyName, `${results.newbalance}`, true)
        message.channel.send({embed});
    }

    if (command === `GIVE` || command === `PAY` || command === `TIP` || command === `TAKEMYMONEYBITCH`) {
        //Check if they defined an amount
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no amount provided')
                .setDescription(`This command requires an amount of ${currencyName} to give. \nExample: \`${prefix2}sub <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        //Make sure args[0] is a number
        if (isNaN(args[0])) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: not a number')
                .setDescription(`This command requires an amount of ${currencyName} to give. Example: \`${prefix2}sub <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        if (Math.sign(args[0]) == -1) {
            message.channel.send(`fuck you`);
            return;
        }

        //Check for defined user
        var defineduser = '';
        if (!args[1]) {
            const embed = new Discord.RichEmbed()
                .setTitle('Error: no user defined')
                .setDescription(`This command requires a user to give ${currencyName} to. Example: \`${prefix2}give <amount> <user>\``)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        } else { //If they define someone, run this
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned;
        }

        var amount = args[0];
        var senderBalance = await eco.FetchBalance(sender.id);

        //Check if sender has enough money
        if (senderBalance.balance < amount) {
            const embed = new Discord.RichEmbed()
                .setTitle(`Error: not enough ${currencyName}`)
                .setDescription(`You do not have enough ${currencyName} to perform this action.`)
                .setColor(0xFF0000)
            message.channel.send({embed});
            return;
        }

        var transfer = await eco.Transfer(sender.id, defineduser.id, amount);

        var senderNewBalance = await eco.FetchBalance(sender.id);
        var recipientNewBalance = await eco.FetchBalance(defineduser.id);
        await ecolvl.SetXp(sender.id, 1);
        await ecolvl.SetLevel(sender.id, senderNewBalance.balance);
        await ecolvl.SetXp(defineduser.id, 1);
        await ecolvl.SetLevel(defineduser.id, recipientNewBalance.balance);

        const embed = new Discord.RichEmbed()
            .setTitle(`${args[0]} ${currencyName} added to ${defineduser.username}\'s Balance`)
            .setColor(0xF1C40F)
            .addField(`${defineduser.username}'s Balance'`, `${recipientNewBalance.balance}`, true)
            .addField(`${sender.username}'s Balance'`, `${senderNewBalance.balance}`, true)
        message.channel.send({embed});
    }

    if (command === `REWARD` || command === `PRIZE` || command === `GIMME`) {
        /*var profile = await lvl.Fetch(message.author.id);

        if (profile.xp == 1) {
            await lvl.SetXp(message.author.id, 2); //Set as claimed
            var results = await eco.AddToBalance(message.author.id, profile.level); //Give level to them in sbux

            const embed = new Discord.RichEmbed() //Send message
                .setTitle(`${message.member.displayName}\'s Balance`)
                .setColor(0xF1C40F)
                .addField(currencyName, `${results.newbalance}`, true)
            message.channel.send({embed});
        } else if (profile.xp == 2) {
            message.channel.send(`Sorry, you've already claimed your reward.`);
        }*/

        var profile = await candy2020.Fetch(message.author.id);

        if (profile.xp != 5) {
            await candy2020.SetXp(message.author.id, 5); //Set as claimed
            var results = await eco.AddToBalance(message.author.id, profile.level); //Give level to them in sbux

            const embed = new Discord.RichEmbed() //Send message
                .setTitle(`${message.member.displayName}\'s Balance`)
                .setColor(0xF1C40F)
                .addField(currencyName, `${results.newbalance}`, true)
            message.channel.send({embed});
        } else if (profile.xp == 5) {
            message.channel.send(`Sorry, you've already claimed your reward.`);
        }
    }

    if (command === `INITIALIZETCLEADERBOARD`) {
        if (sender.id == 72734539834720256) {
            var users = [`343953414335496195`, //AL
                `167375258012221441`, //adlp
                `209457088240418817`, //antiprompt
                `72734539834720256`, //silverhand
                `129820441014435840`, //brio
                `172862174979555331`, //bubbles
                `247185195692720128`, //cael
                `151811295711068161`, //cag
                `562824176700882964`, //coffee
                `136999091354861569`, //cori
                `151073927798587394`, //darsh
                `324723893635907584`, //dimi
                `134031509282750464`, //drax
                `368817136182886411`, //drew
                `145798683995144192`, //duck
                `239503073586708481`, //farm
                `255475811358998528`, //flapo
                `646446533407145986`, //goloche
                `177461438921703434`, //loscar
                `407120766459707392`, //ice
                `175333417481666571`, //marge
                `174695854924365824`, //soap
                `202258713002639360`, //midnight
                `566828080576987156`, //restingcarcass
                `185839155438157832`, //risc
                `276110325575843840`, //skrt
                `262665230406909953`, //streamo
                `437179896813584387`, //struc
                `337284886039625728`, //sugden
                `80434004188200960`, //winnarly
                `91304895465926656`, //wub
                `177545664757104640`]; //draco

            for (var i = 0; i < users.length; i++) {
                var balance = await eco.FetchBalance(users[i]);
                await ecolvl.SetXp(users[i], 1);
                await ecolvl.SetLevel(users[i], balance.balance);
                console.log(`Initialized TC for ${users[i]}`);
            }
            console.log(`Finished initialization`);
            message.channel.send(`Finished initialization`);
        } else {
            message.channel.send(`Hey! You're not Silver!`);
        }
    }

    if (command === `TCLEADERBOARDTEST`) {
        var results = await ecolvl.Fetch(sender.id);

        message.channel.send(`${results.userid} - ${results.level}`)
    }

    //Holiday Commands
    /* 4th of July
    if (command === `FIREWORK` || command === `FIREWORKS`) {
        var c = [`the firework explodes in your face`,
                `the firework sails over your head`,
                `the firework narrowly misses you`,
                `the firework burns the hair off your arm as it flies by`,
                `you are not a puff main and your superior reflexes allow you to catch the firework and throw it at someone else`,
                `the firework flies where it's supposed to and looks pretty`,
                `the firework lands on the ground right in front of you`];

        var r = Math.floor((Math.random() * c.length));

        message.channel.send(c[r]);
    } */

    /*if(command === `EVENT` || command === `HALLOWEEN` || command === `EVENTFAQ` || command === `EVENTINFO`) {  --2019 Message
        message.channel.send(`🎃 Welcome to the 2019 TimCord Halloween Event! 🎃\n\nDuring the event, you will see dogs mysteriously appear who have come to bring you candy. Simply click the emoji beneath their picture to get a reward. The amount of candy you earn will be tracked over the course of the event, and there are prizes based on how much candy you collect. The top 7 placing members of the server at the end of the month will receive a gift of real candy of their choice shipped to them! (Thanks to Risc for helping sponsor the event!) Also, anyone who participates will receive a prize in SilverBux based on how much candy they collect. Good luck and have fun!`);
    }*/

    if(command === `EVENT` || command === `HALLOWEEN` || command === `EVENTFAQ` || command === `EVENTINFO`) {
        message.channel.send(`🎃 Welcome to the 2020 TimCord Halloween Event! 🎃\n\nDuring the event, you will see friendly halloween animals mysteriously appear who have come to bring you candy. Simply click the emoji beneath their picture to get a reward. The amount of candy you earn will be tracked over the course of the event, and there are prizes based on how much candy you collect. The top 10 placing members of the server at the end of the month, as well as 22nd place (sponsored by RestingCarcass), will receive a gift of real candy of their choice shipped to them! There will also be Steam game prizes given out to anyone who collects 500 or more candies, several trick games given out to random participants, and TimCoin prizes relative to your total amount of candies! Thank you to the event sponsors Drax, Farmstink, Midnight, RestingCarcass, Risc, and Silverhand.\n\nFor those familiar with the event there are several changes this year. First, monke has been added. Channels where candy can drop have been limited to #shithead-avenue #melee-salt #newhomies #fuck-whatever and #d1-lamb. There is now a per-user cooldown on triggering the bot to prevent spamming. There is also a very rare !jackpot of candy which grows in size the longer it goes without being collected.\n\nGood luck and have fun!`);
    }

    if (command === `CANDYFIX`) {
        await candy2020.SetXp(message.author.id, 1);
        message.channel.send('Fixed.');
    }

    if (command === `FUCKCUCK`) {
        await candy2020.Delete(175333417481666571);
        message.channel.send('Fuck cuck.');
    }

    if (command === `JACKPOT` || command === `JACKY`) {
        var timbot = await candy2020.Fetch(608819901943119882);
        var currentJackpot = timbot.xp
        message.channel.send('🍬The jackpot is currently at ' + currentJackpot + ' candies!🍬');
    }

    if (command === `SETJACKPOT`) {
        if (message.author.id == 72734539834720256) {
            var timbot = await candy2020.Fetch(608819901943119882);
            await candy2020.SetXp(608819901943119882, args[0]);
            //jackpotCounter = args[0];
            message.channel.send(`Jackpot updated.`);
        } else {
            return;
        }
    }

    if (command === `CANDY` || command === `CANDYBALANCE` || command === `CANDYBAL` || command === `CBAL` || command === `SWEETS` || command === `TREATS` || command === `CANDY` || command === `CANDYBALANCE` || command === `CANDYBAL` || command === `CBAL` || command === `SWEETS` || command === `TREATS`) {
        var output = await candy2020.Fetch(message.author.id);

        const embed = new Discord.RichEmbed()
            .setTitle(`${message.member.displayName}\'s Trick or Treat Bag`)
            .setColor(0xEB6123)
            .addField(`Candies`, `${output.level}`, true)
        message.channel.send({embed});
    }

    //Christmas Event
    /*if (!message.author.bot && message.channel.name == 'snowball-fight') {
        let throwerTeam = fetchTeam(message.author.id);
        let recipientTeam = 0;

        message.channel.fetchMessages({ limit: 2}).then(async messages => {
            let lastMessage = messages.last();
            if (!lastMessage.author.bot && lastMessage.author.id != message.author.id) {
                recipientTeam = fetchTeam(lastMessage.author.id);
            }

            if (recipientTeam != 0 && throwerTeam != recipientTeam) {
                var teamLeader = fetchTeamFirstMember(throwerTeam);

                if (teamLeader == 'Undefined Team') {
                    console.log('Undefined team error');
                } else {
                    await snowlvl.AddLevel(teamLeader, 1);
                    await snowlvl.SetXp(teamLeader, 1);

                    lastMessage.react('653395361607581716');
                }
            }
        })
    }*/

    /*if (command === `STARTEVENT`) {
        if (message.author.id == 72734539834720256) {
            await snowlvl.SetXp(72734539834720256, 1);
            await snowlvl.SetXp(337284886039625728, 1);
            await snowlvl.SetXp(202258713002639360, 1);
            await snowlvl.SetXp(239503073586708481, 1);
            await snowlvl.SetXp(212018836474560513, 1);
            await snowlvl.SetXp(562824176700882964, 1);
            await snowlvl.SetXp(177545664757104640, 1);
            await snowlvl.SetXp(151811295711068161, 1);
            await snowlvl.SetXp(177461438921703434, 1);
            await snowlvl.SetXp(167375258012221441, 1);
            await snowlvl.SetXp(368817136182886411, 1);
            await snowlvl.SetXp(646446533407145986, 1);
            await snowlvl.SetLevel(72734539834720256, 1);
            await snowlvl.SetLevel(337284886039625728, 1);
            await snowlvl.SetLevel(202258713002639360, 1);
            await snowlvl.SetLevel(239503073586708481, 1);
            await snowlvl.SetLevel(212018836474560513, 1);
            await snowlvl.SetLevel(562824176700882964, 1);
            await snowlvl.SetLevel(177545664757104640, 1);
            await snowlvl.SetLevel(151811295711068161, 1);
            await snowlvl.SetLevel(177461438921703434, 1);
            await snowlvl.SetLevel(167375258012221441, 1);
            await snowlvl.SetLevel(368817136182886411, 1);
            await snowlvl.SetLevel(646446533407145986, 1);
            message.channel.send('done');
        } else {
            message.channel.send('not for you, fuck off');
        }
    }*/

    /*if (command === `ADMINUPDATESCORES`) {
        if (message.author.id == 72734539834720256) {
            await snowlvl.AddLevel(72734539834720256, 54);
                await snowlvl.AddLevel(337284886039625728, 89);
                    await snowlvl.AddLevel(177545664757104640, 63);
                        await snowlvl.AddLevel(562824176700882964, 58);
                            await snowlvl.AddLevel(239503073586708481, 49);
                                await snowlvl.AddLevel(212018836474560513, 23);
                                    await snowlvl.AddLevel(202258713002639360, 2);
                                        await snowlvl.AddLevel(167375258012221441, 2);
                                            await snowlvl.AddLevel(177461438921703434, 2);
            message.channel.send('done');
        } else {
            message.channel.send('not for you, fuck off');
        }
    }*/

    /*if (command === `TEAMS` || command === `TEAMMEMBERS`) {
        var team1 = await msglvl.Leaderboard({
            search: 72734539834720256
        });

        var team2 = await msglvl.Leaderboard({
            search: 337284886039625728
        });

        var team3 = await msglvl.Leaderboard({
            search: 202258713002639360
        });

        var team4 = await msglvl.Leaderboard({
            search: 239503073586708481
        });

        var team5 = await msglvl.Leaderboard({
            search: 212018836474560513
        });

        var team6 = await msglvl.Leaderboard({
            search: 562824176700882964
        });

        var team7 = await msglvl.Leaderboard({
            search: 177545664757104640
        });

        var team8 = await msglvl.Leaderboard({
            search: 151811295711068161
        });

        var team9 = await msglvl.Leaderboard({
            search: 177461438921703434
        });

        var team10 = await msglvl.Leaderboard({
            search: 167375258012221441
        });

        var team11 = await msglvl.Leaderboard({
            search: 368817136182886411
        });

        var team12 = await msglvl.Leaderboard({
            search: 646446533407145986
        });

        message.channel.send(`**${fetchTeamName(1)}:** Soap, Risc, and Silver\n**${fetchTeamName(2)}:** Sugden, AL, and Dimi\n**${fetchTeamName(3)}:** Midnight, Brio, and Winnarly\n**${fetchTeamName(4)}:** Farmstink, Bubbles, and Icemaster\n**${fetchTeamName(5)}:** Airplane, Skrt, and Coriamon\n**${fetchTeamName(6)}:** Coffee, Cael, and Rognut\n**${fetchTeamName(7)}:** Draco, Wub, and Darsh\n**${fetchTeamName(8)}:** Cag, Stream, and Zeno\n**${fetchTeamName(9)}:** Loscar, Goiter, and SubF\n**${fetchTeamName(10)}:** ADLP, Rootnut, and Cuck\n**${fetchTeamName(11)}:** Drew, Struc, and Ted\n**${fetchTeamName(12)}:** Goloche, Resting, and Bjart`);
    }

    function fetchTeam(userId) {
        if (userId == 72734539834720256 || userId == 174695854924365824 || userId == 185839155438157832) { //silver, soap, risc
            return 1;
        } else if (userId == 337284886039625728 || userId == 343953414335496195 || userId == 324723893635907584) { //sugden, al, dimi
            return 2;
        } else if (userId == 202258713002639360 || userId == 129820441014435840 || userId == 80434004188200960) { //midnight, brio, winnarly
            return 3;
        } else if (userId == 239503073586708481 || userId == 172862174979555331 || userId == 407120766459707392) { //farmstink, bubbles, icemaster
            return 4;
        } else if (userId == 212018836474560513 || userId == 276110325575843840 || userId == 136999091354861569) { //airplane, skrt, cori
            return 5;
        } else if (userId == 562824176700882964 || userId == 247185195692720128 || userId == 253204535433101323) { //coffee, cael, rognut
            return 6;
        } else if (userId == 177545664757104640 || userId == 91304895465926656 || userId == 151073927798587394) { //draco, wub, darsh
            return 7;
        } else if (userId == 151811295711068161 || userId == 262665230406909953 || userId == 183963049512796160) { //cag, stream, zeno
            return 8;
        } else if (userId == 177461438921703434 || userId == 602985157061771333 || userId == 196333675460296704) { //loscar, goiter, subf
            return 9;
        } else if (userId == 167375258012221441 || userId == 480605174759686164 || userId == 175333417481666571) { //adlp, rootnut, cuck
            return 10;
        } else if (userId == 368817136182886411 || userId == 437179896813584387 || userId == 246994286145437696) { //drew, struc, ted
            return 11;
        } else if (userId == 646446533407145986 || userId == 566828080576987156 || userId == 197027859238354944) { //goloche, resting, bjart
            return 12;
        } else if (userId == 434764602623000576) { //Test acct
            return 13;
        } else { //Not in cluded
            console.log('Undefined user - '+userId);
            return 14;
        }
    }

    function fetchTeamFirstMember(teamId) {
        if (teamId == 1) {
            return 72734539834720256;
        } else if (teamId == 2) {
            return 337284886039625728;
        } else if (teamId == 3) {
            return 202258713002639360;
        } else if (teamId == 4) {
            return 239503073586708481;
        } else if (teamId == 5) {
            return 212018836474560513;
        } else if (teamId == 6) {
            return 562824176700882964;
        } else if (teamId == 7) {
            return 177545664757104640;
        } else if (teamId == 8) {
            return 151811295711068161;
        } else if (teamId == 9) {
            return 177461438921703434;
        } else if (teamId == 10) {
            return 167375258012221441;
        } else if (teamId == 11) {
            return 368817136182886411;
        } else if (teamId == 12) {
            return 646446533407145986;
        } else {
            console.log(`Undefined team - first member `+teamId);
            return 'Undefined Team';
        }
    }

    function fetchTeamName(teamId) {
        if (teamId == 1) {
            return 'Arctic Monkeys :slight_smile: :thumbsup:';
        } else if (teamId == 2) {
            return 'ough...';
        } else if (teamId == 3) {
            return 'Starkville Stanglers';
        } else if (teamId == 4) {
            return 'team cool dudes only ok';
        } else if (teamId == 5) {
            return 'Team Canada';
        } else if (teamId == 6) {
            return ':sun_with_face: :dragon_face:';
        } else if (teamId == 7) {
            return 'Team 7';
        } else if (teamId == 8) {
            return 'The Astros';
        } else if (teamId == 9) {
            return 'Team Loscar';
        } else if (teamId == 10) {
            return 'Mormon Jamz';
        } else if (teamId == 11) {
            return 'Team Toxic Gamers';
        } else if (teamId == 12) {
            return 'Team Netplay';
        } else {
            console.log(`Undefined team - team name`);
            return 'Undefined Team';
        }
    }

    if (command === `TEAMTEST`) {
        message.channel.send(returnTeam(message.author.id));
    }*/

})

client.login(token);
