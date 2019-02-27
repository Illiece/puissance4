$( document ).ready(function() {
    jQuery.fn.reverse = [].reverse;
    $.fn.creationGrille = function set_plateau( lignes , colonnes , couleur1 , couleur2 )
    {
        var person = prompt("Entrez le nombre de colonnes du plateau (compris entre 6 et 15)", 6 );
        if (person != null) {
            if(person > 15 || person < 6)
            {
                person = 6;
            }
            colonnes = person;
        }
        var person = prompt("Entrez le nombre de  du plateau (compris entre 5 et 13)", 5);
        if (person != null) {
            if(person > 13 || person < 5)
            {
                person = 5;
            }
            lignes = person;
        }
        $("body").append("<div class='jeu'>");
        $(".jeu").append("<div class='plateau_de_jeu'>");
        for (i = 0; i < colonnes; i++) {
            $(".plateau_de_jeu").append("<div class='data-col-"+i+" col'>");
            for (j = 0; j < lignes; j++){
                $(".data-col-"+i+"").append("<div class='item empty' data-colonnes='"+i+"' data-position='"+j+"'>");
            }
        }
        $("body").append("<div class='navbar'>");
        $(".navbar").append("<button type='button' class='rejouer'>Rejouer</button>");
        $(".navbar").append("<button type='button' class='tour'>Tour du joueur 1</button>");
        $(".navbar").append("<button id='score1' type='button' class='score_j1' disabled>0</button><label for='score1'>Score du joueur 1</label>");
        $(".navbar").append("<button id='score2' type='button' class='score_j2' disabled>0</button><label for='score2'>Score du joueur 2</label>");
        $(".navbar").append("<button id='undo' type='button' class='undo'>Undo</button>");
        $(".navbar").append("<button id='mute' type='button' class='mute'>MUTE</button>");
        var teleport = new Audio('teleport.mp3');
        var attention = new Audio('attention.mp3');
        var victoire = new Audio('victoire.mp3');
        var raciste = new Audio('raciste.mp3');
        var count = 0;
        var j1_score= 0;
        var j2_score= 0;
        var undo= '';
        var count_undo = 0;
        var answer = confirm("Vous souhaitez jouer a deux ?")
        if (answer) {
            var couleur1 = prompt("Entrez la couleur du joueur 1 (choisir parmis 'jaune' , 'violet' , 'vert')*jaune par defaut", "jaune");
            if (couleur1 != null) {
                if(couleur1 === 'violet')
                {
                    couleur1 = 'purple';
                }
                else if(couleur1 === 'vert')
                {
                     couleur1 = 'green';
                }
            }
            var couleur2 = prompt("Entrez la couleur du joueur 2 (choisir parmis 'rouge' , 'blanc' , 'brun')*rouge par defaut", "rouge");
            if (couleur2 != null) {
                if(couleur2 === 'blanc')
                {
                    couleur2 = 'white';
                }
                else if(couleur2 === 'brun')
                {
                     couleur2 = 'brown';
                }
                
            }
        }
        else{}
       var count_v1 = 0;
       var count_v2 = 0;
       var theme = new Audio('theme.mp3'); 
        theme.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
        }, false);
        theme.play();
        $(document).on('click', function set(e) {
            var clicked_class = e.target;
            var count_click = 0;
            if ($(clicked_class).hasClass('item')) {
                        $(clicked_class).parent().children().reverse().each(function(){
                            if ($(this).hasClass('empty'))
                            {
                                if ((count % 2)=== 0 && count_click === 0 ) 
                                {   
                                    count_undo = 1;
                                    $(this).addClass("joueur1").css("background-color",couleur1).html("Z").removeClass("empty");
                                    $(".tour").html("Tour du joueur2");
                                    teleport.play();
                                    undo = this;                 
                                    count_click ++;
                                    count ++;
                                    check();
                                    
                                }
                                else if ((count % 2)=== 1 && count_click === 0 )
                                {
                                    count_undo = 1;
                                    $(this).addClass("joueur2").css("background-color",couleur2).html("Z").removeClass("empty");
                                    $(".tour").html("Tour du joueur1");
                                    teleport.play();
                                    undo = this;
                                    count_click ++;
                                    count ++;
                                    check();
                                }
                            }
                        });
                    }

        });
        function check()
        {
            // VERTICAL CHECK FOR WIN
            for (i = 0; i < colonnes; i++)
            {
                for (j = 0; j < lignes; j++)
                {
                    var verif = $(".data-col-"+i+"");

                    var inner_verif = verif.children();
                    count_v1=0;
                    count_v2=0;
                    for (j = 0; j < lignes; j++)
                    {
                        
                        if($(inner_verif[j]).hasClass("joueur1"))
                        {
                            count_v2 = 0;
                            count_v1++;
                            if(count_v1 > 3)
                            {
                                victoire.play();
                                alert("Joueur1 a gagner");
                                j1_score++;
                                $(".score_j1").html(""+j1_score+"");
                                restart();
                                return;
                            }
                        }
                        else if($(inner_verif[j]).hasClass("joueur2"))
                        {
                            count_v1 = 0;
                            count_v2++;
                            if(count_v2 > 3)
                            {
                                raciste.play();
                                alert("Joueur2 a gagner");
                                j2_score++;
                                $(".score_j2").html(""+j2_score+"");
                                restart();
                                return;
                            }
                        }
                        else if($(inner_verif[j]).hasClass("empty"))
                        {
                            count_v1 = 0;
                            count_v2 = 0;
                        }
                    }
                }
                
            }
            // HORIZONTAL CHECK WIN
            for (j = 0; j < lignes; j++)
            {
                for (i = 0; i < colonnes ; i++)
                {
                    var verif = $(".item[data-position='"+j+"']");
                    var inner_verif = verif;
                    count_v1=0;
                    count_v2=0; 
                    for (i = 0; i < colonnes; i++)
                    {
                        console.log(inner_verif);
                        if($(inner_verif[i]).hasClass("joueur1"))
                        {
                            count_v2 = 0;
                            count_v1++;
                            if(count_v1 > 3)
                            {
                                victoire.play();
                                alert("Joueur1 a gagner");
                                j1_score++;
                                $(".score_j1").html(""+j1_score+"");
                                restart();
                                return;
                            }
                        }
                        else if($(inner_verif[i]).hasClass("joueur2"))
                        {
                            count_v1 = 0;
                            count_v2++;
                            if(count_v2 > 3)
                            {
                                raciste.play();
                                alert("Joueur2 a gagner");
                                j2_score++;
                                $(".score_j2").html(""+j2_score+"");
                                restart();
                                return;
                            }
                        }
                        else if($(inner_verif[i]).hasClass("empty"))
                        {
                            count_v1 = 0;
                            count_v2 = 0;
                        }
                    }
                }
            }
                // DIAGONALES CHECK WIN
            for (j = 0; j < lignes; j++)
            {
                for (i = 0; i < colonnes ; i++)
                {
                    count_v1=0;
                    count_v2=0;
                    for (diag = 0;  diag < 4; diag++)
                    {
                        var select_c= i + diag;
                        var select_l= j + diag;
                        var verif = $(".item[data-colonnes='"+select_c+"'][data-position='"+select_l+"']");
                        console.log(verif);
                        if($(verif).hasClass("joueur1"))
                        {
                            count_v2 = 0;
                            count_v1++;
                            if(count_v1 > 3)
                            {
                                victoire.play();
                                alert("Joueur1 a gagner");
                                j1_score++;
                                $(".score_j1").html(""+j1_score+"");
                                restart();
                                return;
                            }
                        }
                        else if($(verif).hasClass("joueur2"))
                        {
                            count_v1 = 0;
                            count_v2++;
                            if(count_v2 > 3)
                            {
                                raciste.play();
                                alert("Joueur2 a gagner");
                                j2_score++;
                                $(".score_j2").html(""+j2_score+"");
                                restart();
                                return;
                            }
                        }
                        else if($(verif).hasClass("empty"))
                        {
                            count_v1 = 0;
                            count_v2 = 0;
                        }

                    }
                    count_v1 = 0;
                    count_v2 = 0;
                    for (diag = 0;  diag < 4; diag++)
                    {
                        var select_c=  i - diag ;
                        var select_l=  j + diag ;
                        var verif = $(".item[data-colonnes='"+select_c+"'][data-position='"+select_l+"']");
                        if($(verif).hasClass("joueur1"))
                        {
                            count_v2 = 0;
                            count_v1++;
                            if(count_v1 > 3)
                            {
                                victoire.play();
                                alert("Joueur1 a gagner");
                                j1_score++;
                                $(".score_j1").html(""+j1_score+"");
                                restart();
                                return;
                            }
                        }
                        else if($(verif).hasClass("joueur2"))
                        {
                            count_v1 = 0;
                            count_v2++;
                            if(count_v2 > 3)
                            {
                            raciste.play();
                            alert("Joueur2 a gagner");
                            j2_score++;
                            $(".score_j2").html(""+j2_score+"");
                            restart();
                            return;
                            }
                        }
                        else if($(verif).hasClass("empty"))
                        {
                            count_v1 = 0;
                            count_v2 = 0;
                        }

                    }
                }
            }
        }
        $(".rejouer").on('click', function restart()
        {
            $(".item").removeClass("joueur1 joueur2").css("background-color","").html('').addClass("empty");
            $(".tour").html("Tour du joueur1");
            count_v1=0;
            count_v2=0;
            count=0;
            count_undo = 0;
        });
        $(".undo").on('click', function make_undo()
        {
            if(count_undo === 1)
            {
                attention.play();
                console.log(undo);
                $(undo).removeClass("joueur1 joueur2").css("background-color","").html('').addClass("empty");
                count--;
                count_undo = 0;
                if ((count % 2)=== 0)
                {
                    $(".tour").html("Tour du joueur1");
                }
                else
                {
                    $(".tour").html("Tour du joueur2");
                }
            }
            else{}
        });
        $(".mute").on('click', function mute()
        {
            if(theme.muted === false)
            {
                theme.muted = true;
            }
            else
            {
                theme.muted = false;
            }
        });
        function restart()
        {
            $(".item").removeClass("joueur1 joueur2").css("background-color","").html('').addClass("empty");
            $(".tour").html("Tour du joueur1");
            count_v1=0;
            count_v2=0;
            count=0;
            count_undo = 0;
        };
    };
$( document ).creationGrille(7,7,"jaune","rouge");
});