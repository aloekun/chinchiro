/**
 * @jest-environment jsdom
 */
import { RoleEnum, getRollStr } from "../../types/RoleEnum"
import {ErrorJudge, judgeRole} from "../JudgeLogic"

test("ヒフミチェック", () => {
    const [roll, dice, errorJudge] = judgeRole([1,2,3]);

    const rollStr = getRollStr(roll);
    const targetStr = getRollStr(RoleEnum.HIFUMI);
    expect(rollStr).toBe(targetStr);
});

test("シゴロチェック", () => {
    const [roll, dice, errorJudge] = judgeRole([4,5,6]);

    const rollStr = getRollStr(roll);
    const targetStr = getRollStr(RoleEnum.SHIGORO);
    expect(rollStr).toBe(targetStr);
});

test("アラシチェック", () => {
    const [roll, dice, errorJudge] = judgeRole([3,3,3]);

    const rollStr = getRollStr(roll);
    const targetStr = getRollStr(RoleEnum.ARASHI);
    expect(rollStr).toBe(targetStr);
});

test("ピンゾロチェック", () => {
    const [roll, dice, errorJudge] = judgeRole([1,1,1]);

    const rollStr = getRollStr(roll);
    const targetStr = getRollStr(RoleEnum.PINZORO);
    expect(rollStr).toBe(targetStr);
});

test("2つの目が同じ、残り1つチェック", () => {
    const [roll, dice, errorJudge] = judgeRole([2,2,5]);

    const rollStr = getRollStr(roll);
    const targetStr = getRollStr(RoleEnum.ONLY_ONE_ROLL);
    expect(rollStr).toBe(targetStr);
    expect(dice).toBe(5);
});

test("目無しチェック", () => {
    const [roll, dice, errorJudge] = judgeRole([1,2,5]);

    const rollStr = getRollStr(roll);
    const targetStr = getRollStr(RoleEnum.MENASHI);
    expect(rollStr).toBe(targetStr);
});

test("ダイス不足チェック", () => {
    const [roll, dice, errorJudge] = judgeRole([1,1]);

    expect(errorJudge).toBe(ErrorJudge.DICE_NUM_NOT_MUCH);
});

test("ダイス過剰チェック", () => {
    const [roll, dice, errorJudge] = judgeRole([1,2,3,4,5,6]);

    expect(errorJudge).toBe(ErrorJudge.DICE_NUM_NOT_MUCH);
});