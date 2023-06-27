class EnemyBullet{
    constructor(x,y){
        this.x=x
        this.y=y
        this.r=8
        this.toDelete=false
    }

    show(){
        noStroke()
        fill(255,150,0)
        ellipse(this.x,this.y,this.r*2,this.r*2)
    }

    move(){
        this.y=this.y+3
    }
}