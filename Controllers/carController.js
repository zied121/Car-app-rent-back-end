const Car = require('../model/Carmodel');

const addCar = async (req, res) => {
    const userId = req.user
    const car = req.body;

    try {

        const newCar = new Car({
            matricule: car.matricule,
            marque: car.marque,
            kilometrage: car.kilometrage,
            carowner: userId

        });
        
        await newCar.save();
        res.status(200).json({
            newCar
        });

    } catch (err) {
        res.status(400).json({
            msg: "operation failed"
        });
    }
};
const FindCar = async (req, res) => {
    const userId = req.user
    console.log(userId)
    
   try {
         const car = await Car.findById({carowner: userId}.populate('User', "name email"));
         console.log(car);
         res.status(200).json({
              car
         });
   } catch (err) {
         res.status(400).json({
              msg: "operation failed"
         });
    }
}

module.exports = {
    addCar,FindCar
};