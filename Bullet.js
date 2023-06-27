class Bullet{
    constructor(x,y){
        this.x=x
        this.y=y
        this.r=8
        this.toDelete=false
        this.hit=false
    }

    show(){
        noStroke();
        fill(150,0,255);
        ellipse(this.x,this.y,this.r*2,this.r*2);
    }

    move(){
        this.y=this.y-5
    }

    hits(enemy){
        let d=dist(this.x,this.y,enemy.x,enemy.y)
        if(d<this.r+enemy.r){
            enemy.health -=1;
            if(enemy.health ===0){
                return true
            }
            return false
        }else{
            return false
        }
     }
}
