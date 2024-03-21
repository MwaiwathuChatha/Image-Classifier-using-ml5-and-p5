let mobilenet;
let picture;

function setup(){
    createCanvas(600,350);
    picture=createImg('colorBack3.jpg', imageReady=()=>{
        image(picture,0,0,width,height);
    });
    picture.hide();
    background(0);
 
    mobilenet=ml5.imageClassifier('MobileNet',modelReady=()=>{
      console.log('Model is ready!');
      mobilenet.predict(picture,gotResult=(error, results)=>{
        if (error){
            console.error(error);
        }
        else{
            console.log(results);
            let label=results[0].label;
            let prob=results[0].confidence*100;
            let probTrunc=prob.toFixed(3);
            fill(0);
            textSize(90);
            text(label,40,70);
            createP('This has been identified as a '+label);
            createP('Confidence: '+probTrunc+'%');
        }

      })  
    });
}