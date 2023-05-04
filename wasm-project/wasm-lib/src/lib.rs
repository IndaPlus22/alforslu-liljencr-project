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
fn get_attraction_force(m1: f64, m2: f64, r: f64) -> f64 {
    let g = 6.67408 * 10.0_f64.powi(-11); 
    g * (m1 * m2) / r.powi(2)
}

// Newton's Law of Universal Gravitation in 2D
// r = |r2 - r1|
// Result is the force applied on object 2 exerted by object 1
// https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation#Vector_form
#[wasm_bindgen]
pub fn get_attraction_force_vector2(m1: f64, m2: f64, r: Vec<f64>) -> Vec<f64> {
    let r = na::Vector2::new(r[0], r[1]); // Ugly workaround
    let g = 6.67408 * 10.0_f64.powi(-11); 
    let force = -g * (m1 * m2) / r.norm_squared(); // Force is negative because it is applied on object 2
    vector2_to_vec(r.normalize() * force) // Normalize the vector and multiply by the force
}

fn vector2_to_vec(vec: na::Vector2<f64>) -> Vec<f64> {
    vec![vec.x, vec.y]
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
}

