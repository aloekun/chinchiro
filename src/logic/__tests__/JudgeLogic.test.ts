/**
 * @jest-environment jsdom
 */
import { RollEnum, getRollStr } from "../../types/RollEnum"
import {ErrorJudge, judgeRoll} from "../JudgeLogic"

test("ヒフミチェック", () => {
    const [roll, dice, errorJudge] = judgeRoll([1,2,3]);

    const rollStr = getRollStr(roll);
    const targetStr = getRollStr(RollEnum.HIFUMI);
    expect(rollStr).toBe(targetStr);
});

test("シゴロチェック", () => {
    const [roll, dice, errorJudge] = judgeRoll([4,5,6]);

    const rollStr = getRollStr(roll);
    const targetStr = getRollStr(RollEnum.SHIGORO);
    expect(rollStr).toBe(targetStr);
});

test("アラシチェック", () => {
    const [roll, dice, errorJudge] = judgeRoll([3,3,3]);

    const rollStr = getRollStr(roll);
    const targetStr = getRollStr(RollEnum.ARASHI);
    expect(rollStr).toBe(targetStr);
});

test("ピンゾロチェック", () => {
    const [roll, dice, errorJudge] = judgeRoll([1,1,1]);

    const rollStr = getRollStr(roll);
    const targetStr = getRollStr(RollEnum.PINZORO);
    expect(rollStr).toBe(targetStr);
});

test("2つの目が同じ、残り1つチェック", () => {
    const [roll, dice, errorJudge] = judgeRoll([2,2,5]);

    const rollStr = getRollStr(roll);
    const targetStr = getRollStr(RollEnum.ONLY_ONE_ROLL);
    expect(rollStr).toBe(targetStr);
    expect(dice).toBe(5);
});

test("目無しチェック", () => {
    const [roll, dice, errorJudge] = judgeRoll([1,2,5]);

    const rollStr = getRollStr(roll);
    const targetStr = getRollStr(RollEnum.MENASHI);
    expect(rollStr).toBe(targetStr);
});

test("ダイス不足チェック", () => {
    const [roll, dice, errorJudge] = judgeRoll([1,1]);

    expect(errorJudge).toBe(ErrorJudge.DICE_NUM_NOT_MUCH);
});

test("ダイス過剰チェック", () => {
    const [roll, dice, errorJudge] = judgeRoll([1,2,3,4,5,6]);

    expect(errorJudge).toBe(ErrorJudge.DICE_NUM_NOT_MUCH);
});