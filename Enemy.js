class Enemy{
    constructor(x,y,type){
        this.x=x
        this.y=y
        this.r=15
        this.speed=2
        this.type=type
        if(this.type===1){
            this.health=1
        }else if(this.type===2){
            this.health=2
        }else if(this.type===3){
            this.health=3
        }
    }
 
    show(){
        if(this.type===1){
            fill(255,0,0)
        }else if(this.type===2){
            fill(255,165,0)
        }else if(this.type===3){
            fill(255,255,0)
        }
        ellipse(this.x,this.y,this.r*2,this.r*2)
    }
 
    move(){
        this.x+=this.speed
        if(this.x>width||this.x<0){
            this.speed=-this.speed
            this.y+=50
        }
    }
 }
 