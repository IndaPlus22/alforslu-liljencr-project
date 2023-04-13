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
pub fn get_attraction_force(m1: f64, m2: f64, r: f64) -> f64 {
    let g = 6.67408 * 10.0_f64.powi(-11); 
    g * (m1 * m2) / r.powi(2)
}

// Newton's Law of Universal Gravitation in 2D
// r = |r2 - r1|
// Result is the force applied on object 2 exerted by object 1
// https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation#Vector_form
pub fn get_attraction_force_vector3(m1: f64, m2: f64, r: na::Vector2<f64>) -> na::Vector2<f64> {
    let g = 6.67408 * 10.0_f64.powi(-11); 
    let force = -g * (m1 * m2) / r.norm_squared(); // Force is negative because it is applied on object 2
    r.normalize() * force // Normalize the vector and multiply by the force
}



#[cfg(test)]
mod tests {
    use super::*;

    // Test attraction force function
    #[test]
    fn test_get_attraction_force() {
        let result = get_attraction_force(1.0, 1.0, 1.0);
        assert_eq!(result, 6.67408 * 10.0_f64.powi(-11));
    }

    // Test attraction force vector function
    #[test]
    fn test_get_attraction_force_vector() {
        let result = get_attraction_force_vector3(1.0, 1.0, na::Vector2::new(1.0, 1.0));
        assert_eq!(result, na::Vector2::new(-2.359643613090756 * 10.0_f64.powi(-11), -2.359643613090756 * 10.0_f64.powi(-11)));
    }

}

