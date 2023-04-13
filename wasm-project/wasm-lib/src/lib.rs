use wasm_bindgen::prelude::*;
extern crate nalgebra as na;

#[wasm_bindgen]
pub fn add(left: usize, right: usize) -> usize {
    left + right
}

// Newton's Law of Universal Gravitation
// F = G * (m1 * m2) / r^2
// G = 6.67408 * 10^-11
// F = force
// m1 = mass of object 1
// m2 = mass of object 2
// r = distance between object 1 and object 2
// Returns the force of attraction between two objects
#[wasm_bindgen]
pub fn get_attraction_force(m1: f64, m2: f64, r: f64) -> f64 {
    let g = 6.67408 * 10.0_f64.powi(-11); 
    g * (m1 * m2) / r.powi(2)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}

