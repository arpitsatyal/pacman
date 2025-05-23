function TileSet() {
  /* Here we load each of the sprites as a frame*/
  this.frames = [
    /*0*/ new Frame(144, 71, 24, 24),
    /*1*/ new Frame(96, 71, 24, 24), // right
    /*2*/ new Frame(48, 71, 24, 24),
    /*3*/ new Frame(0, 71, 24, 24), // left
    /*4*/ new Frame(72, 71, 24, 24),
    /*5*/ new Frame(24, 71, 24, 24), // up
    /*6*/ new Frame(168, 71, 24, 24),
    /*7*/ new Frame(120, 71, 24, 24), // down

    /*8*/ new Frame(192, 36, 12, 12),
    /*9*/ new Frame(204, 36, 12, 12),
    /*10*/ new Frame(216, 36, 12, 12),
    /*11*/ new Frame(228, 36, 12, 12),
    /*12*/ new Frame(240, 36, 12, 12),
    /*13*/ new Frame(252, 36, 12, 12),
    /*14*/ new Frame(264, 36, 12, 12),
    /*15*/ new Frame(276, 36, 12, 12),
    /*16*/ new Frame(288, 36, 12, 12),
    /*17*/ new Frame(300, 36, 12, 12),
    /*18*/ new Frame(312, 36, 12, 12),
    /*19*/ new Frame(324, 36, 12, 12),
    /*20*/ new Frame(336, 36, 12, 12),
    /*21*/ new Frame(348, 36, 12, 12),
    /*22*/ new Frame(360, 36, 12, 12),
    /*23*/ new Frame(372, 36, 12, 12),

    /*24*/ new Frame(192, 48, 12, 12),
    /*25*/ new Frame(204, 48, 12, 12),
    /*26*/ new Frame(216, 48, 12, 12),
    /*27*/ new Frame(228, 48, 12, 12),
    /*28*/ new Frame(240, 48, 12, 12),
    /*29*/ new Frame(252, 48, 12, 12),
    /*30*/ new Frame(264, 48, 12, 12),
    /*31*/ new Frame(276, 48, 12, 12),
    /*32*/ new Frame(288, 48, 12, 12),
    /*33*/ new Frame(300, 48, 12, 12),
    /*34*/ new Frame(312, 48, 12, 12),
    /*35*/ new Frame(324, 48, 12, 12),
    /*36*/ new Frame(336, 48, 12, 12),
    /*37*/ new Frame(348, 48, 12, 12),
    /*38*/ new Frame(360, 48, 12, 12),
    /*39*/ new Frame(372, 48, 12, 12),

    /*40*/ new Frame(192, 60, 12, 12),
    /*41*/ new Frame(204, 60, 12, 12),
    /*42*/ new Frame(216, 60, 12, 12),
    /*43*/ new Frame(228, 60, 12, 12),
    /*44*/ new Frame(240, 60, 12, 12),
    /*45*/ new Frame(252, 60, 12, 12),
    /*46*/ new Frame(264, 60, 12, 12),
    /*47*/ new Frame(276, 60, 12, 12),
    /*48*/ new Frame(288, 60, 12, 12),
    /*49*/ new Frame(300, 60, 12, 12),
    /*50*/ new Frame(312, 60, 12, 12),
    /*51*/ new Frame(324, 60, 12, 12),

    /*52*/ new Frame(0, 96, 12, 12),
    /*53*/ new Frame(12, 96, 12, 12),
    /*54*/ new Frame(24, 96, 12, 12),
    /*55*/ new Frame(36, 96, 12, 12),
    /*56*/ new Frame(48, 96, 12, 12),
    /*57*/ new Frame(60, 96, 12, 12),
    /*58*/ new Frame(72, 96, 12, 12),
    /*59*/ new Frame(84, 96, 12, 12),
    /*60*/ new Frame(96, 96, 12, 12),
    /*61*/ new Frame(108, 96, 12, 12),
    /*62*/ new Frame(120, 96, 12, 12),
    /*63*/ new Frame(132, 96, 12, 12),

    /*64*/ new Frame(0, 108, 12, 12),
    /*65*/ new Frame(12, 108, 12, 12),
    /*66*/ new Frame(24, 108, 12, 12),
    /*67*/ new Frame(36, 108, 12, 12),
    /*68*/ new Frame(48, 108, 12, 12),
    /*69*/ new Frame(60, 108, 12, 12),
    /*70*/ new Frame(72, 108, 12, 12),
    /*71*/ new Frame(84, 108, 12, 12),
    /*72*/ new Frame(96, 108, 12, 12),
    /*73*/ new Frame(108, 108, 12, 12),
    /*74*/ new Frame(120, 108, 12, 12),
    /*75*/ new Frame(132, 108, 12, 12),
    /*76*/ new Frame(336, 60, 12, 12), //maps

    /*77*/ new Frame(192, 0, 12, 12),
    /*78*/ new Frame(216, 0, 12, 12), //balls

    /*79*/ new Frame(0, 216, 24, 24),
    /*80*/ new Frame(24, 216, 24, 24), //right orange
    /*81*/ new Frame(48, 216, 24, 24),
    /*82*/ new Frame(72, 216, 24, 24), //orange down
    /*83*/ new Frame(96, 216, 24, 24),
    /*84*/ new Frame(120, 216, 24, 24), //left orange
    /*85*/ new Frame(144, 216, 24, 24),
    /*86*/ new Frame(168, 216, 24, 24), //orange up

    /*87*/ new Frame(0, 192, 24, 24),
    /*88*/ new Frame(24, 192, 24, 24), //pink right
    /*89*/ new Frame(48, 192, 24, 24),
    /*90*/ new Frame(72, 192, 24, 24), //pink down
    /*91*/ new Frame(96, 192, 24, 24),
    /*92*/ new Frame(120, 192, 24, 24), //left rose
    /*93*/ new Frame(144, 192, 24, 24),
    /*94*/ new Frame(168, 192, 24, 24), //pink top

    /*95*/ new Frame(0, 144, 24, 24),
    /*96*/ new Frame(24, 144, 24, 24), //right red
    /*97*/ new Frame(48, 144, 24, 24),
    /*98*/ new Frame(72, 144, 24, 24), //red down
    /*99*/ new Frame(96, 144, 24, 24),
    /*100*/ new Frame(120, 144, 24, 24), //red left
    /*101*/ new Frame(144, 144, 24, 24),
    /*102*/ new Frame(168, 144, 24, 24), //red top

    /*103*/ new Frame(192, 192, 24, 24),
    /*104*/ new Frame(216, 192, 24, 24), //right blue
    /*105*/ new Frame(240, 192, 24, 24),
    /*106*/ new Frame(264, 192, 24, 24), //blue down
    /*107*/ new Frame(288, 192, 24, 24),
    /*108*/ new Frame(312, 192, 24, 24), //blue left
    /*109*/ new Frame(336, 192, 24, 24),
    /*110*/ new Frame(360, 192, 24, 24), //blue up

    /*111*/ new Frame(192, 216, 24, 24),
    /*112*/ new Frame(216, 216, 24, 24), //right eyes
    /*113*/ new Frame(240, 216, 24, 24),
    /*114*/ new Frame(264, 216, 24, 24), //eyes down
    /*115*/ new Frame(288, 216, 24, 24),
    /*116*/ new Frame(312, 216, 24, 24), //eyes left
    /*117*/ new Frame(336, 216, 24, 24),
    /*118*/ new Frame(360, 216, 24, 24), //eyes up

    /*119*/ new Frame(144, 96, 24, 24),
    /*120*/ new Frame(168, 96, 24, 24), //frightened gray
    /*121*/ new Frame(192, 96, 24, 24),
    /*122*/ new Frame(216, 96, 24, 24), //frightened blue

    /*123*/ new Frame(96, 168, 24, 24),
    /*124*/ new Frame(120, 168, 24, 24),
    /*125*/ new Frame(144, 168, 24, 24),
    /*126*/ new Frame(168, 168, 24, 24),
    /*127*/ new Frame(192, 168, 24, 24),
    /*128 */ new Frame(216, 168, 24, 24),
    /*129*/ new Frame(240, 168, 24, 24),
    /*130*/ new Frame(264, 168, 24, 24),
    /*131*/ new Frame(312, 168, 24, 24),
    /*132*/ new Frame(336, 168, 24, 24),
    /*133*/ new Frame(360, 168, 24, 24), //pacman die
  ];
}
