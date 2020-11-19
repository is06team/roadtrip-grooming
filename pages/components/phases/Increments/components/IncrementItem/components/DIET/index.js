import styles from './styles.module.scss';

export default function DIET() {
  return (
    <div className={styles.DIET}>
      <span className="checkField">
        <span className="checkMark"></span>
        <input type="checkbox" className="user_story_increment_diet_d" value="D" name="diet[D]" />
        <label>D</label>
      </span>
      <span className="checkField">
        <span className="checkMark"></span>
        <input type="checkbox" className="user_story_increment_diet_i" value="I" name="diet[I]" />
        <label>I</label>
      </span>
      <span className="checkField">
        <span className="checkMark"></span>
        <input type="checkbox" className="user_story_increment_diet_e" value="E" name="diet[E]" />
        <label>E</label>
      </span>
      <span className="checkField">
        <span className="checkMark"></span>
        <input type="checkbox" className="user_story_increment_diet_t" value="T" name="diet[T]" />        
        <label>T</label>
      </span>
    </div>
  )
}